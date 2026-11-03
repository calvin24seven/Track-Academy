-- Stories wall: moderators can edit the published wording, set an anonymous label
-- and feature the strongest stories. Only approved stories with publish consent are public.

alter table public.campaign_stories
  add column if not exists published_text text check (char_length(published_text) <= 3000),
  add column if not exists display_label text check (char_length(display_label) <= 60),
  add column if not exists featured boolean not null default false;

-- Visitors can't set moderation fields on submit.
alter policy "anyone can submit a story" on public.campaign_stories
  with check (status = 'pending' and reviewed_by is null and alerted_at is null
              and published_text is null and display_label is null and featured = false);

create index if not exists stories_public_idx on public.campaign_stories (status, consent_publish, featured, reviewed_at desc);

-- Anonymous label from the submitter's relationship (no names).
create or replace function public.campaign_story_label(rel text, age text)
returns text language sql immutable set search_path = '' as $$
  select case rel
    when 'parent' then 'A parent'
    when 'athlete' then case when age in ('under_13', '13_17') then 'A young athlete' else 'An athlete' end
    when 'alumni' then 'A former athlete'
    when 'coach_volunteer' then 'A coach'
    when 'club_member' then 'A club member'
    when 'resident' then 'A local resident'
    else 'A supporter'
  end;
$$;

-- Public, paged list of published stories. Optional filter by relationship group.
create or replace function public.campaign_public_stories(lim int default 24, off int default 0, p_group text default null)
returns json
language sql stable security definer set search_path = public
as $$
  with pub as (
    select coalesce(nullif(trim(published_text), ''), story) as text,
           coalesce(nullif(trim(display_label), ''), campaign_story_label(relationship, age_band)) as label,
           case when relationship in ('coach_volunteer', 'club_member') then 'coaches'
                when relationship in ('athlete', 'alumni') then 'athletes'
                when relationship = 'parent' then 'parents'
                else 'community' end as grp,
           featured, reviewed_at
    from campaign_stories
    where status = 'approved' and consent_publish
  ), f as (
    select * from pub where p_group is null or pub.grp = p_group
  )
  select json_build_object(
    'total', (select count(*) from f),
    'published', (select count(*) from pub),
    'groups', (select coalesce(json_object_agg(g, n), '{}'::json) from (select grp g, count(*) n from pub group by 1) x),
    'rows', coalesce((
      select json_agg(json_build_object('text', text, 'label', label, 'featured', featured))
      from (select * from f order by featured desc, reviewed_at desc nulls last
            limit greatest(1, least(lim, 100)) offset greatest(0, off)) r
    ), '[]'::json)
  );
$$;
grant execute on function public.campaign_public_stories(int, int, text) to anon, authenticated;

-- Public stats: add how many stories have been received and published (counts only).
create or replace function public.campaign_public_stats()
returns json
language sql stable security definer set search_path = public
as $$
  select json_build_object(
    'petition', (select count(*) from petition_signatures),
    'petition_brent', (select count(*) from petition_signatures where in_brent),
    'petition_today', (select count(*) from petition_signatures
                       where created_at >= date_trunc('day', now() at time zone 'Europe/London') at time zone 'Europe/London'),
    'emails_sent', (select count(*) from campaign_actions where action = 'email_sent'),
    'wards_reached', (select count(distinct ward) from petition_signatures where in_brent),
    'stories_received', (select count(*) from campaign_stories),
    'stories_published', (select count(*) from campaign_stories where status = 'approved' and consent_publish),
    'recent', coalesce((
      select json_agg(r) from (
        select case when in_brent and ward is not null then ward else null end as ward, created_at
        from petition_signatures order by created_at desc limit 6
      ) r
    ), '[]'::json),
    'stories', coalesce((
      select json_agg(s) from (
        select coalesce(nullif(trim(published_text), ''), story) as story,
               coalesce(nullif(trim(display_label), ''), campaign_story_label(relationship, age_band)) as display_name,
               relationship, featured
        from campaign_stories
        where status = 'approved' and consent_publish
        order by featured desc, reviewed_at desc nulls last
        limit 9
      ) s
    ), '[]'::json)
  );
$$;
grant execute on function public.campaign_public_stats() to anon, authenticated;
