-- Email alerts for new skills offers and stories.
-- A trigger pings the `campaign-alert` Edge Function (no row data is sent).
-- The function claims unsent rows (alerted_at is null), emails them, and
-- releases the claim if sending fails, so nothing is lost before Resend is set up.

create extension if not exists pg_net with schema extensions;

alter table public.campaign_offers  add column if not exists alerted_at timestamptz;
alter table public.campaign_stories add column if not exists alerted_at timestamptz;

create or replace function public.campaign_ping_alert()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  perform net.http_post(
    url := 'https://ddgchywxajftqdukcjbv.supabase.co/functions/v1/campaign-alert',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('table', tg_table_name)
  );
  return null;
end;
$$;
revoke execute on function public.campaign_ping_alert() from public, anon, authenticated;

drop trigger if exists campaign_offers_alert on public.campaign_offers;
create trigger campaign_offers_alert after insert on public.campaign_offers
  for each statement execute function public.campaign_ping_alert();

drop trigger if exists campaign_stories_alert on public.campaign_stories;
create trigger campaign_stories_alert after insert on public.campaign_stories
  for each statement execute function public.campaign_ping_alert();

-- Visitors can't pre-mark their own row as already alerted.
alter policy "anyone can offer help" on public.campaign_offers with check (status = 'new' and alerted_at is null);
alter policy "anyone can submit a story" on public.campaign_stories
  with check (status = 'pending' and reviewed_by is null and alerted_at is null);
