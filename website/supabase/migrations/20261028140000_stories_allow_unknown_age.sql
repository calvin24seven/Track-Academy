-- Stories can come from the "tell Brent how Track Academy helped" line in the email step.
-- A parent's line is usually about their child but gives no age, so it is stored as 'unknown'
-- (which still needs parent consent, via story_child_consent) and flagged for a DSL check.
alter table public.campaign_stories drop constraint if exists campaign_stories_age_band_check;
alter table public.campaign_stories add constraint campaign_stories_age_band_check
  check (age_band in ('under_13','13_17','18_plus','unknown'));
