-- Consultation phase (decision by 25 Nov 2026; representations to leisure@brent.gov.uk by 5pm 20 Nov).
-- 1. A private personal link per signer, so returning supporters get their details and earlier
--    words pre-filled on any device (no fingerprinting; the link is an unguessable token).
-- 2. A table of the answers people give when they write to the council, so Track Academy can
--    report totals (users, intended use, willingness to pay, school/club booking pledges).

alter table public.petition_signatures
  add column if not exists link_token uuid not null default gen_random_uuid();
create unique index if not exists petition_link_token_idx on public.petition_signatures (link_token);

-- Look up a signer by their personal link. Returns only what's needed to pre-fill the page.
create or replace function public.campaign_lookup(token uuid)
returns json
language sql stable security definer set search_path = public
as $$
  select json_build_object(
    'full_name', p.full_name,
    'email', p.email,
    'postcode', p.postcode,
    'ward', p.ward,
    'in_brent', p.in_brent,
    'relationship', p.relationship,
    'signed_at', p.created_at,
    'emailed_councillors', exists (
      select 1 from campaign_actions a
      where a.action = 'email_sent' and p.session_id is not null and a.session_id = p.session_id),
    'story', (
      select coalesce(nullif(trim(s.published_text), ''), s.story)
      from campaign_stories s
      where s.contact_email = p.email and s.status <> 'rejected'
      order by s.created_at desc limit 1)
  )
  from petition_signatures p
  where p.link_token = token;
$$;
revoke execute on function public.campaign_lookup(uuid) from public;
grant execute on function public.campaign_lookup(uuid) to anon, authenticated;

create table if not exists public.consultation_responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  respondent text not null check (respondent in
    ('athlete','parent','coach','club','school','centre_member','resident','other')),
  organisation text check (char_length(organisation) <= 160),
  used_track text check (used_track in ('this_year','before','not_yet')),
  frequency text check (frequency in ('weekly','monthly','occasionally')),
  days text[] not null default '{}',
  would_use text check (would_use in ('definitely','probably','not_sure')),
  pay text check (pay in ('up_to_3','3_to_5','5_to_8','8_plus','would_book','prefer_not')),
  keep_track boolean,
  org_hours_per_week numeric check (org_hours_per_week between 0 and 80),
  org_young_people int check (org_young_people between 0 and 5000),
  has_own_words boolean not null default false,
  postcode_district text check (char_length(postcode_district) <= 5),
  ward text check (char_length(ward) <= 80),
  in_brent boolean,
  returning_signer boolean not null default false,
  status text not null default 'opened' check (status in ('opened','sent')),
  method text check (char_length(method) <= 20),
  ref text check (char_length(ref) <= 60),
  session_id text check (char_length(session_id) <= 40)
);
alter table public.consultation_responses enable row level security;

create policy "anyone can record a response" on public.consultation_responses
  for insert to anon, authenticated with check (true);
create policy "admins read responses" on public.consultation_responses
  for select to authenticated using (public.campaign_is_admin());

-- Mark a response as sent (the page has no read access, so it updates by id via this function).
create or replace function public.consultation_mark_sent(response_id uuid, sid text)
returns void
language sql security definer set search_path = public
as $$
  update consultation_responses set status = 'sent'
  where id = response_id and session_id = sid and status = 'opened';
$$;
grant execute on function public.consultation_mark_sent(uuid, text) to anon, authenticated;

-- Public count for the page (sent responses only).
create or replace function public.consultation_public_stats()
returns json
language sql stable security definer set search_path = public
as $$
  select json_build_object(
    'responses', (select count(*) from consultation_responses where status = 'sent'),
    'petition', (select count(*) from petition_signatures),
    'stories', (select count(*) from campaign_stories where status = 'approved')
  );
$$;
grant execute on function public.consultation_public_stats() to anon, authenticated;

-- Admin totals for the dashboard and Track Academy's own submission.
create or replace function public.consultation_admin_stats()
returns json
language plpgsql stable security definer set search_path = public
as $$
declare result json;
begin
  if not public.campaign_is_admin() then raise exception 'not authorised'; end if;
  with r as (select * from consultation_responses where status = 'sent')
  select json_build_object(
    'sent', (select count(*) from r),
    'opened', (select count(*) from consultation_responses),
    'returning', (select count(*) from r where returning_signer),
    'by_respondent', coalesce((select json_object_agg(respondent, n) from (select respondent, count(*) n from r group by 1) x), '{}'::json),
    'used', coalesce((select json_object_agg(coalesce(used_track,'not_said'), n) from (select used_track, count(*) n from r group by 1) x), '{}'::json),
    'would_use', coalesce((select json_object_agg(coalesce(would_use,'not_said'), n) from (select would_use, count(*) n from r group by 1) x), '{}'::json),
    'pay', coalesce((select json_object_agg(coalesce(pay,'not_said'), n) from (select pay, count(*) n from r group by 1) x), '{}'::json),
    'saturday', (select count(*) from r where 'saturday' = any(days)),
    'keep_track_yes', (select count(*) from r where keep_track),
    'organisations', coalesce((select json_agg(o) from (
        select organisation, respondent, org_hours_per_week, org_young_people, days, created_at
        from r where organisation is not null order by created_at) o), '[]'::json),
    'org_hours_total', (select coalesce(sum(org_hours_per_week), 0) from r),
    'org_young_people_total', (select coalesce(sum(org_young_people), 0) from r)
  ) into result;
  return result;
end;
$$;
revoke execute on function public.consultation_admin_stats() from public, anon;
grant execute on function public.consultation_admin_stats() to authenticated;

-- Signer list: include each signer's personal link token (admins only), for the Sender export.
create or replace function public.campaign_signers(
  q text default null,
  only_brent boolean default false,
  only_optin boolean default false,
  only_not_emailed boolean default false,
  lim int default 50,
  off int default 0
)
returns json
language plpgsql stable security definer set search_path = public
as $$
declare result json;
begin
  if not public.campaign_is_admin() then
    raise exception 'not authorised';
  end if;

  with s as (
    select p.*,
           exists (
             select 1 from campaign_actions a
             where a.action = 'email_sent' and p.session_id is not null and a.session_id = p.session_id
           ) as emailed
    from petition_signatures p
  ), f as (
    select * from s
    where (q is null or q = '' or full_name ilike '%' || q || '%' or email ilike '%' || q || '%'
           or postcode ilike '%' || q || '%' or coalesce(ward, '') ilike '%' || q || '%')
      and (not only_brent or in_brent)
      and (not only_optin or consent_updates)
      and (not only_not_emailed or not emailed)
  )
  select json_build_object(
    'total', (select count(*) from f),
    'rows', coalesce((
      select json_agg(r) from (
        select created_at, full_name, email, postcode, ward, in_brent, relationship,
               consent_council, consent_updates, ref, emailed, link_token
        from f order by created_at desc
        limit greatest(1, least(lim, 50000)) offset greatest(0, off)
      ) r
    ), '[]'::json)
  ) into result;
  return result;
end;
$$;
