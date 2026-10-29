-- Public counter: add "signed today" and a recent-activity feed.
-- The feed shows only the ward (or "outside Brent") and the time: never names.
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
    'recent', coalesce((
      select json_agg(r) from (
        select case when in_brent and ward is not null then ward else null end as ward, created_at
        from petition_signatures order by created_at desc limit 6
      ) r
    ), '[]'::json),
    'stories', coalesce((
      select json_agg(s) from (
        select display_name, relationship, story
        from campaign_stories
        where status = 'approved' and consent_publish
        order by reviewed_at desc nulls last
        limit 9
      ) s
    ), '[]'::json)
  );
$$;
grant execute on function public.campaign_public_stats() to anon, authenticated;
