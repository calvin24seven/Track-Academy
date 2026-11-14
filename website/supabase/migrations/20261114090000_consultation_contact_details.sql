-- Track Academy needs to know who responded (CEO decision, 14 Nov 2026).
-- Store name, email, postcode and the person's own words with each consultation response.
-- The page says so before sending, and a copy of every email goes to Track Academy (cc).
-- Only campaign admins can read these rows (existing RLS policy).

alter table public.consultation_responses
  add column if not exists full_name text check (char_length(full_name) <= 120),
  add column if not exists email text check (char_length(email) <= 200),
  add column if not exists postcode text check (char_length(postcode) <= 10),
  add column if not exists role text check (char_length(role) <= 80),
  add column if not exists own_words text check (char_length(own_words) <= 1500);

create index if not exists consultation_responses_created_idx on public.consultation_responses (created_at desc);
create index if not exists consultation_responses_email_idx on public.consultation_responses (lower(email));
