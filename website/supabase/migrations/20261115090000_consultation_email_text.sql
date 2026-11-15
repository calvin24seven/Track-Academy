-- Track Academy is no longer copied in on consultation emails (CEO decision, 15 Nov 2026).
-- Instead, store the exact subject and email text the page handed to the person's email app,
-- so the dashboard shows what each person sent. (Edits made inside their own email app aren't visible.)
alter table public.consultation_responses
  add column if not exists email_subject text check (char_length(email_subject) <= 300),
  add column if not exists email_body text check (char_length(email_body) <= 8000);
