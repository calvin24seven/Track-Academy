-- One row per email sent through Resend (campaign alerts now; welcome, reminder,
-- receipt and trial emails in later phases). Makes every email queryable.
create table if not exists public.email_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (char_length(kind) <= 60),      -- e.g. campaign_alert, welcome, payment_failed
  to_addresses text[] not null,
  subject text not null check (char_length(subject) <= 300),
  resend_id text,                                         -- Resend's email id, for delivery lookups
  status text not null check (status in ('sent','failed')),
  error text check (char_length(error) <= 2000),
  related jsonb not null default '{}'::jsonb              -- ids of the rows the email was about
);
alter table public.email_log enable row level security;

create policy "admins read email log" on public.email_log
  for select to authenticated using (public.campaign_is_admin());
-- Only Edge Functions (service role) write to it.

create index if not exists email_log_kind_created_idx on public.email_log (kind, created_at desc);
