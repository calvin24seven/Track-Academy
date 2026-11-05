-- Stories are published automatically (CEO decision, 5 Nov 2026), anonymously labelled.
-- Held in "pending" for a person to check: stories explicitly about an under-18 (campaign plan:
-- child quotes need the DSL's check) and stories containing an email address, phone number or link.
-- Moderators can still edit, feature or unpublish any story from the dashboard.

create or replace function public.campaign_story_needs_check(s public.campaign_stories)
returns boolean language sql immutable set search_path = '' as $$
  select s.age_band in ('under_13', '13_17')
      or s.story ~* '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}'   -- email address
      or s.story ~ '(\+44|0)\s?\d{2,4}[\s-]?\d{3,4}[\s-]?\d{3,4}' -- UK phone number
      or s.story ~* '(https?://|www\.)';                       -- link
$$;

-- AFTER INSERT so the public insert policy still sees a 'pending' row; the owner-run update then publishes it.
create or replace function public.campaign_auto_publish_story()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.consent_publish and not public.campaign_story_needs_check(new) then
    update public.campaign_stories
       set status = 'approved', reviewed_by = 'auto-published', reviewed_at = now()
     where id = new.id and status = 'pending';
  end if;
  return null;
end;
$$;
revoke execute on function public.campaign_auto_publish_story() from public, anon, authenticated;

drop trigger if exists campaign_stories_auto_publish on public.campaign_stories;
create trigger campaign_stories_auto_publish after insert on public.campaign_stories
  for each row execute function public.campaign_auto_publish_story();

-- Publish everything already waiting that passes the same rule.
update public.campaign_stories s
   set status = 'approved', reviewed_by = 'auto-published', reviewed_at = coalesce(s.reviewed_at, s.created_at)
 where s.status = 'pending' and s.consent_publish and not public.campaign_story_needs_check(s);
