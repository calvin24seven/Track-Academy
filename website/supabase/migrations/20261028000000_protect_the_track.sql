-- Protect Brent Athletics campaign
-- Public visitors can only INSERT (no reads). Public numbers come from
-- campaign_public_stats(). Admins (emails in campaign_admins) can read and moderate.

-- Emails are stored lowercase (enforced by checks) so uniqueness is case-insensitive.

-- ---------- Admins ----------
create table if not exists public.campaign_admins (
  email text primary key check (email = lower(email)),
  added_at timestamptz not null default now()
);
alter table public.campaign_admins enable row level security;
-- No policies: only service role / SQL editor can manage admins.

create or replace function public.campaign_is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.campaign_admins
    where email = lower(auth.jwt() ->> 'email')
  );
$$;

-- ---------- Shared checks ----------
-- relationship: who the supporter is
-- ref: partner / channel code from ?ref= (e.g. qph, ea, whatsapp-parents)

-- ---------- Petition ----------
create table if not exists public.petition_signatures (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email = lower(email) and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(email) <= 200),
  postcode text not null check (char_length(postcode) between 2 and 10),
  ward text check (char_length(ward) <= 80),
  in_brent boolean,
  relationship text not null check (relationship in
    ('parent','athlete','alumni','coach_volunteer','resident','club_member','other')),
  consent_council boolean not null default false,   -- ok to share name + postcode with Brent Council
  consent_updates boolean not null default false,   -- ok to email campaign updates
  ref text check (char_length(ref) <= 60),
  constraint petition_one_per_email unique (email)
);
alter table public.petition_signatures enable row level security;

create policy "anyone can sign" on public.petition_signatures
  for insert to anon, authenticated with check (consent_council = true);
create policy "admins read petition" on public.petition_signatures
  for select to authenticated using (public.campaign_is_admin());

-- ---------- Light-weight actions (email sent, share clicks) ----------
create table if not exists public.campaign_actions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  action text not null check (action in
    ('email_opened','email_sent','share_whatsapp','share_copy','share_native','share_x','share_facebook')),
  method text check (char_length(method) <= 30),           -- mailto / gmail / outlook / copy
  ward text check (char_length(ward) <= 80),
  in_brent boolean,
  relationship text check (char_length(relationship) <= 30),
  recipients int check (recipients between 0 and 20),
  ref text check (char_length(ref) <= 60),
  session_id text check (char_length(session_id) <= 40)    -- random per browser, for de-duping
);
alter table public.campaign_actions enable row level security;

create policy "anyone can log an action" on public.campaign_actions
  for insert to anon, authenticated with check (true);
create policy "admins read actions" on public.campaign_actions
  for select to authenticated using (public.campaign_is_admin());

-- ---------- Stories (moderated, safeguarding) ----------
create table if not exists public.campaign_stories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  display_name text not null check (char_length(display_name) between 1 and 60),
  relationship text not null check (char_length(relationship) <= 30),
  age_band text not null check (age_band in ('under_13','13_17','18_plus')),
  story text not null check (char_length(story) between 20 and 3000),
  contact_email text check (char_length(contact_email) <= 200),
  consent_publish boolean not null default false,
  parent_consent boolean not null default false,
  media_ok boolean not null default false,   -- happy to be contacted by press (via TA only)
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  reviewed_by text,
  reviewed_at timestamptz,
  ref text check (char_length(ref) <= 60),
  constraint story_child_consent check (age_band = '18_plus' or parent_consent = true)
);
alter table public.campaign_stories enable row level security;

create policy "anyone can submit a story" on public.campaign_stories
  for insert to anon, authenticated with check (status = 'pending' and reviewed_by is null);
create policy "admins read stories" on public.campaign_stories
  for select to authenticated using (public.campaign_is_admin());
create policy "admins moderate stories" on public.campaign_stories
  for update to authenticated using (public.campaign_is_admin()) with check (public.campaign_is_admin());

-- ---------- Skills / contacts offers ----------
create table if not exists public.campaign_offers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  email text not null check (email = lower(email) and char_length(email) <= 200),
  phone text check (char_length(phone) <= 30),
  skills text[] not null default '{}',
  details text check (char_length(details) <= 2000),
  status text not null default 'new' check (status in ('new','contacted','active','not_needed')),
  ref text check (char_length(ref) <= 60)
);
alter table public.campaign_offers enable row level security;

create policy "anyone can offer help" on public.campaign_offers
  for insert to anon, authenticated with check (status = 'new');
create policy "admins read offers" on public.campaign_offers
  for select to authenticated using (public.campaign_is_admin());
create policy "admins update offers" on public.campaign_offers
  for update to authenticated using (public.campaign_is_admin()) with check (public.campaign_is_admin());

-- ---------- Membership survey (anonymous) ----------
create table if not exists public.membership_survey (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  is_member boolean not null,
  membership_type text check (membership_type in
    ('individual','family','junior','concession','pay_as_you_go','other')),
  members_in_household int check (members_in_household between 0 and 12),
  monthly_spend_band text check (monthly_spend_band in
    ('under_20','20_39','40_59','60_99','100_plus','not_sure')),
  would_consider_cancelling text check (would_consider_cancelling in ('yes','maybe','no')),
  would_consider_joining text check (would_consider_joining in ('yes','maybe','no')),
  uses_centre_during_sessions boolean,   -- parent uses gym/café while child trains
  comment text check (char_length(comment) <= 1500),
  postcode_district text check (char_length(postcode_district) <= 5),  -- e.g. NW10, never full postcode
  ref text check (char_length(ref) <= 60),
  session_id text check (char_length(session_id) <= 40),
  constraint survey_branch check (
    (is_member and would_consider_cancelling is not null)
    or (not is_member and would_consider_joining is not null)
  )
);
alter table public.membership_survey enable row level security;

create policy "anyone can answer survey" on public.membership_survey
  for insert to anon, authenticated with check (true);
create policy "admins read survey" on public.membership_survey
  for select to authenticated using (public.campaign_is_admin());

-- ---------- Councillor & stakeholder response log (admin only) ----------
create table if not exists public.stakeholder_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  logged_by text default (auth.jwt() ->> 'email'),
  stakeholder text not null check (char_length(stakeholder) <= 120),  -- e.g. "Cllr Jake Rubin"
  organisation text check (char_length(organisation) <= 120),           -- Brent Council / EA / press
  channel text check (char_length(channel) <= 40),                       -- email / meeting / call / press
  stance text not null default 'no_response' check (stance in
    ('champion','supportive','neutral','opposed','no_response')),
  summary text check (char_length(summary) <= 3000),
  next_step text check (char_length(next_step) <= 500),
  next_step_due date
);
alter table public.stakeholder_log enable row level security;

create policy "admins manage log" on public.stakeholder_log
  for all to authenticated using (public.campaign_is_admin()) with check (public.campaign_is_admin());

-- ---------- Indexes ----------
create index if not exists petition_created_idx on public.petition_signatures (created_at);
create index if not exists petition_ward_idx on public.petition_signatures (ward);
create index if not exists actions_action_idx on public.campaign_actions (action, created_at);
create index if not exists stories_status_idx on public.campaign_stories (status);

-- ---------- Public numbers (safe to show anyone) ----------
create or replace function public.campaign_public_stats()
returns json
language sql stable security definer set search_path = public
as $$
  select json_build_object(
    'petition', (select count(*) from petition_signatures),
    'petition_brent', (select count(*) from petition_signatures where in_brent),
    'emails_sent', (select count(*) from campaign_actions where action = 'email_sent'),
    'wards_reached', (select count(distinct ward) from petition_signatures where in_brent),
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

-- ---------- Admin numbers ----------
create or replace function public.campaign_admin_stats()
returns json
language plpgsql stable security definer set search_path = public
as $$
declare result json;
begin
  if not public.campaign_is_admin() then
    raise exception 'not authorised';
  end if;

  select json_build_object(
    'totals', json_build_object(
      'petition', (select count(*) from petition_signatures),
      'petition_brent', (select count(*) from petition_signatures where in_brent),
      'petition_updates_optin', (select count(*) from petition_signatures where consent_updates),
      'emails_opened', (select count(*) from campaign_actions where action = 'email_opened'),
      'emails_sent', (select count(*) from campaign_actions where action = 'email_sent'),
      'shares', (select count(*) from campaign_actions where action like 'share_%'),
      'stories_pending', (select count(*) from campaign_stories where status = 'pending'),
      'stories_approved', (select count(*) from campaign_stories where status = 'approved'),
      'offers', (select count(*) from campaign_offers),
      'survey', (select count(*) from membership_survey)
    ),
    'by_ward', coalesce((select json_agg(w order by w.signatures desc) from (
        select coalesce(p.ward, 'Outside Brent / unknown') as ward,
               count(*) as signatures
        from petition_signatures p group by 1
      ) w), '[]'::json),
    'emails_by_ward', coalesce((select json_agg(w order by w.sent desc) from (
        select coalesce(ward, 'Outside Brent / unknown') as ward, count(*) as sent
        from campaign_actions where action = 'email_sent' group by 1
      ) w), '[]'::json),
    'by_ref', coalesce((select json_agg(r order by r.total desc) from (
        select coalesce(ref, 'direct') as ref,
               count(*) filter (where src = 'petition') as petition,
               count(*) filter (where src = 'email_sent') as emails,
               count(*) as total
        from (
          select ref, 'petition' as src from petition_signatures
          union all
          select ref, 'email_sent' from campaign_actions where action = 'email_sent'
        ) x group by 1
      ) r), '[]'::json),
    'by_relationship', coalesce((select json_agg(r) from (
        select relationship, count(*) as n from petition_signatures group by 1 order by 2 desc
      ) r), '[]'::json),
    'daily', coalesce((select json_agg(d order by d.day) from (
        select day,
               sum(petition) as petition,
               sum(emails) as emails
        from (
          select date_trunc('day', created_at)::date as day, 1 as petition, 0 as emails from petition_signatures
          union all
          select date_trunc('day', created_at)::date, 0, 1 from campaign_actions where action = 'email_sent'
        ) x group by day
      ) d), '[]'::json),
    'survey', json_build_object(
      'members', (select count(*) from membership_survey where is_member),
      'non_members', (select count(*) from membership_survey where not is_member),
      'cancel_yes', (select count(*) from membership_survey where is_member and would_consider_cancelling = 'yes'),
      'cancel_maybe', (select count(*) from membership_survey where is_member and would_consider_cancelling = 'maybe'),
      'cancel_no', (select count(*) from membership_survey where is_member and would_consider_cancelling = 'no'),
      'join_yes', (select count(*) from membership_survey where not is_member and would_consider_joining = 'yes'),
      'join_maybe', (select count(*) from membership_survey where not is_member and would_consider_joining = 'maybe'),
      'join_no', (select count(*) from membership_survey where not is_member and would_consider_joining = 'no'),
      'uses_centre_during_sessions', (select count(*) from membership_survey where uses_centre_during_sessions),
      -- Annual revenue linked to members who would consider cancelling, using band midpoints.
      'annual_revenue_at_risk_yes', (select coalesce(sum(m.mid * 12), 0) from membership_survey s
          join (values ('under_20',15),('20_39',30),('40_59',50),('60_99',80),('100_plus',110)) m(band, mid)
          on m.band = s.monthly_spend_band
          where s.is_member and s.would_consider_cancelling = 'yes'),
      'annual_revenue_at_risk_maybe', (select coalesce(sum(m.mid * 12), 0) from membership_survey s
          join (values ('under_20',15),('20_39',30),('40_59',50),('60_99',80),('100_plus',110)) m(band, mid)
          on m.band = s.monthly_spend_band
          where s.is_member and s.would_consider_cancelling = 'maybe')
    )
  ) into result;
  return result;
end;
$$;
revoke execute on function public.campaign_admin_stats() from anon;
grant execute on function public.campaign_admin_stats() to authenticated;

-- ---------- After running: add your admins ----------
-- insert into public.campaign_admins (email) values
--   ('calvin@partneredgrowth.com'), ('patrik@trackacademy.co.uk');
