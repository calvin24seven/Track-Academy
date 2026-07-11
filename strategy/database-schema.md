# Database Schema — Track Academy

*Version 1.0 · July 2026*
*Supabase/PostgreSQL schema for engagement tracking, registration, and operations.*

---

## Overview

This schema supports three layers:
1. **Public-facing** — registration, enquiries, events, fixtures
2. **Operational** — attendance, athletes, coaches, sessions, schools
3. **Impact reporting** — outcomes, demographics, dashboards

The design principle: **capture once, report many ways.** Data entered at registration shouldn't need re-entry; attendance taken once should populate every report.

All tables use UUID primary keys unless noted. Row-Level Security (RLS) enabled on all tables — public read where appropriate, staff write protected.

---

## Table Definitions

### 1. `athletes`
Young people registered with Track Academy.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | default gen_random_uuid() |
| first_name | text NOT NULL | |
| last_name | text NOT NULL | |
| date_of_birth | date NOT NULL | |
| gender | text | enum: male, female, transgender, intersex, non-binary, other, prefer_not_to_say |
| ethnicity | text | from registration dropdown |
| faith | text | optional |
| english_first_language | boolean | |
| disability | text[] | array of conditions or empty |
| medical_conditions | text[] | array of conditions |
| other_medical_info | text | free text |
| consent_photography_internal | boolean | |
| consent_photography_third_party | boolean | |
| consent_email_upshot | boolean | |
| consent_surveys_upshot | boolean | |
| send_sessions | text[] | ["athletics", "multi_skills", "education", "mentoring", "send"] auto-detected based on age and needs |
| start_date | date | |
| membership_status | text | enum: fee_paying, no_fees, alumni, school_pupils_premium, golden_ticket |
|REFERRED_BY | text | referral_source |
| emergency_contact_1_name | text NOT NULL | |
| emergency_contact_1_relationship | text | |
| emergency_contact_1_phone | text NOT NULL | |
| emergency_contact_2_name | text NOT NULL | |
| emergency_contact_2_relationship | text | |
| emergency_contact_2_phone | text NOT NULL | |
| upshot_id | text | once synced to Upshot |
| upshot_sync_status | text | enum: pending, synced, failed |
| upshot_synced_at | timestamptz | |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | trigger on update |

### 2. `guardians`
Parents/carers responsible for athletes.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| first_name | text NOT NULL | |
| last_name | text NOT NULL | |
| email | text NOT NULL | unique |
| phone | text NOT NULL | |
| address_line_1 | text | |
| address_line_2 | text | |
| town_city | text | |
| county | text | |
| postcode | text NOT NULL | |
| relationship_type | text | enum: parent, guardian, other |
| universal_credit | boolean | for free membership eligibility |
| child_benefit | boolean | |
| employment_support_allowance | boolean | |
| not_in_receipt_of_benefits | boolean | default true if none selected |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | |

### 3. `athlete_guardians` (junction)
Many-to-many: athlete ↔ guardian.

| Column | Type | Notes |
|---|---|---|
| athlete_id | uuid (FK) | |
| guardian_id | uuid (FK) | |
| is_primary | boolean | primary contact |
| created_at | timestamptz | |

### 4. `schools`
Partner schools and schools attended by athletes.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name | text NOT NULL | |
| type | text | enum: nursery, primary, secondary, sixteen_plus, all_through, other |
| address | text | |
| postcode | text | |
| contact_name | text | Head of PE, etc. |
| contact_email | text | |
| contact_phone | text | |
| is_partner | boolean | false for non-partner schools attended by athletes |
| partnership_tier | text | enum: bronze, silver, gold — null if not partner |
| partnership_start_date | date | |
| partnership_end_date | date | |
| pupil_premium_count | integer | approximate PP pupils at school |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### 5. `athlete_schools` (junction)
Athlete ↔ school relationship.

| Column | Type | Notes |
|---|---|---|
| athlete_id | uuid (FK) | |
| school_id | uuid (FK) | |
| is_pupil_premium | boolean | for partnership funding allocation |
| started_at | date | when athlete started at this school |
| ended_at | date | when left |
| created_at | timestamptz | |

### 6. `education_records`
Academic info for athletes.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| athlete_id | uuid (FK) | |
| in_education_employment_training | text | required enum |
| sats_performance | text | enum: excellent, good, very_well, okay, room_for_improvement, can_do_with_support, na |
| gcse_maths | text | "1-9", "na", "unsure" |
| gcse_english | text | |
| gcse_science | text | |
| permission_to_share_with_school | boolean | |
| recorded_at | date | when this snapshot was taken |
| created_at | timestamptz | |

### 7. `staff`
Coaches, mentors, tutors, trustees, employees.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| first_name | text NOT NULL | |
| last_name | text NOT NULL | |
| role | text | enum: ceo, operations_manager, education_coordinator, head_of_sport, coach, mentor, tutor, trustee, volunteer |
| role_title_display | text | public-facing title |
| email | text | |
| phone | text | |
| bio | text | |
| photo_url | text | |
| dbs_check_status | text | enum: clear, pending, expired, not_required |
| dbs_checked_at | date | |
| safeguarding_training_date | date | |
| england_athletics_qualified | boolean | |
| is_public | boolean | true if should appear on /team page |
| display_order | integer | for /team page ordering |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### 8. `programmes`
Types of sessions Track Academy runs.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name | text NOT NULL | "Athletics", "Multi-skills", "Education", "Mentoring", "SEND", etc. |
| slug | text | url slug |
| description | text | |
| age_min | integer | |
| age_max | integer | |
| price_per_term | numeric | default 25.00 |
| is_free_for_low_income | boolean | default true |
| active | boolean | |
| created_at | timestamptz | |

### 9. `session_definitions`
Recurring session definitions (template).

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| programme_id | uuid (FK) | |
| name | text NOT NULL | e.g., "Tuesday Athletics" |
| day_of_week | integer | 0=Sun, 1=Mon, ..., 6=Sat |
| start_time | time NOT NULL | |
| end_time | time NOT NULL | |
| venue | text | default: Willesden Sports Centre |
| lead_staff_id | uuid (FK) | |
| active | boolean | |
| created_at | timestamptz | |

### 10. `session_instances`
Specific session occurrences.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| session_definition_id | uuid (FK) | |
| date | date NOT NULL | |
| start_time | time | |
| end_time | time | |
| venue | text | |
| lead_staff_id | uuid (FK) | |
| notes | text | |
| cancelled | boolean | |
| cancellation_reason | text | |
| created_at | timestamptz | |

### 11. `session_attendance`
Who attended which session instance.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| session_instance_id | uuid (FK) | |
| athlete_id | uuid (FK) | |
| staff_id | uuid (FK) | who logged |
| attended | boolean NOT NULL | |
| arrived_late | boolean | |
| left_early | boolean | |
| notes | text | |
| recorded_at | timestamptz | when logged |
| created_at | timestamptz | |

### 12. `events`
Public events (Open Meets, community days, holiday programmes).

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name | text NOT NULL | |
| slug | text NOT NULL | unique |
| description | text | |
| event_type | text | enum: open_meet, community, school_group, holiday_programme, fundraiser |
| start_date | timestamptz NOT NULL | |
| end_date | timestamptz | |
| venue | text | default Willesden Sports Centre |
| age_min | integer | |
| age_max | integer | |
| price | numeric | default 0 |
| entry_link | text | URL (OpenTrack etc.) |
| entry_status | text | enum: open, closed, not_yet_open, not_required |
| entries_close_date | timestamptz | |
| image_url | text | |
| publish_date | timestamptz | for going live on site |
| is_published | boolean | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### 13. `fixtures`
Competition fixtures for Track Academy athletes.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name | text NOT NULL | |
| date | date NOT NULL | |
| end_date | date | for multi-day |
| venue | text NOT NULL | |
| age_groups | text[] | e.g., ["U15", "U17", "U20", "Senior"] |
| entry_type | text | enum: self_entry, club_selected, both |
| entry_link | text | URL |
| competition_type | text | enum: indoor, outdoor, county, national, league, relay |
| is_track_academy_hosted | boolean | |
| notes | text | |
| is_published | boolean | |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### 14. `outcomes_surveys`
Periodic self-reported outcome surveys.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| athlete_id | uuid (FK) | |
| survey_date | date NOT NULL | |
| survey_type | text | enum: annual, termly, adhoc |
| improved_school_performance | boolean | |
| gained_new_skills | boolean | |
| believe_can_achieve_goals | boolean | |
| feel_connected_to_community | boolean | |
| has_made_new_friends | boolean | |
| improved_confidence | boolean | |
| can_manage_stress | boolean | |
| feel_belonging | boolean | |
| feels_supported | boolean | |
| would_recommend | boolean | |
| notes | text | |
| created_at | timestamptz | |

### 15. `enquiries`
Contact form submissions and partner enquiries.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| form_type | text NOT NULL | enum: contact_general, school_enquiry, funder_enquiry, volunteer_enquiry, performance_coaching_enquiry |
| submitter_name | text NOT NULL | |
| submitter_email | text NOT NULL | |
| submitter_phone | text | |
| submitter_role | text | for school forms: Head/Deputy/PE Lead |
| organisation | text | for school/funder forms |
| school_type | text | for school forms |
| pupil_premium_count | integer | for school forms |
| preferred_programme | text | |
| message | text | |
| status | text | enum: new, contacted, closed |
| assigned_to | uuid (FK) | staff member |
| created_at | timestamptz | |

### 16. `upshot_sync_log`
Tracks sync status with Upshot.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| athlete_id | uuid (FK) | |
| direction | text | enum: to_upshot, from_upshot |
| status | text | enum: pending, success, failed, retrying |
| attempt_count | integer | default 0 |
| error_message | text | |
| request_payload | jsonb | what was sent |
| response_payload | jsonb | what came back |
| synced_at | timestamptz | |

### 17. `membership_payments`
Fee tracking.

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| athlete_id | uuid (FK) | |
| amount | numeric NOT NULL | |
| currency | text | default GBP |
| period_start | date | |
| period_end | date | |
| payment_method | text | enum: bank_transfer, spond, paypal, stripe |
| payment_status | text | enum: pending, paid, overdue, cancelled, refunded |
| payment_reference | text | |
| paid_at | timestamptz | |
| created_at | timestamptz | |

### 18. `volunteer_signups`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| name | text NOT NULL | |
| email | text NOT NULL | |
| phone | text | |
| interest_area | text | enum: events, admin, mentoring, coaching, other |
| availability | text | |
| message | text | |
| dbs_check_required | boolean | |
| status | text | enum: new, contacted, onboarded, closed |
| created_at | timestamptz | |

---

## Row-Level Security (RLS) Policy Summary

### Public-facing tables (read)
- `events` (published only)
- `fixtures` (published only)
- `staff` (is_public = true only)

### Write-protected (staff only via authenticated Supabase role)
- All other tables

### Form submission (public insert, staff read)
- `enquiries`
- `athletes` (via registration wizard — insert only, no public read)
- `guardians`
- `athlete_guardians`
- `education_records`
- `volunteer_signups`

---

## Indexing Strategy

Key indexes for performance:
- `athletes.date_of_birth` (age calculations)
- `athletes.upshot_sync_status` (sync queue)
- `session_attendance.athlete_id` (athlete history)
- `session_attendance.session_instance_id` (session log)
- `events.start_date` (event listing)
- `fixtures.date` (fixture listing)
- `enquiries.created_at` (staff dashboard)
- `outcomes_surveys.survey_date` (impact dashboard)

---

## Initial Migration Plan

### Migration 1: Schema creation
- Create all above tables
- Apply indexes
- Enable RLS with permissive read policies

### Migration 2: Seed reference data
- Programmes: Athletics, Multi-skills, Education, Mentoring, Holiday, SEND, Performance Coaching
- Staff records: from annual report (Patrik, Yvonne, Erick, Matthew, all coaches/mentors/tutors, trustees)
- Session definitions: per the weekly schedule (Tue/Thu/Sat athletics, Tue multi-skills, Sat tuition, Tue SEND)

### Migration 3: Migration of existing data (manual)
- Import athletes from Upshot export (CSV → Supabase)
- Import schools from current partner list
- Import historical outcomes data from annual report (optional)

### Migration 4: Functions + views
- Function: `calculate_age_group(date_of_birth)` → returns "multi_skills", "mainstream", or "young_adult"
- Function: `total_attendance_2024()` → aggregate stats for impact dashboard
- View: `impact_summary_2024` → single-row view with all key stats for impact page

---

## Future Extensions (Phase 2+)

- `athlete_passports` — per-term passport record (attendance, confidence, fitness, behaviour rating)
- `mentor_session_logs` — mentor notes per session
- `school_reports` — generated termly impact reports per school partnership
- `push_notifications` — for parent portal
- `audit_log` — for safeguarding-sensitive record changes
- `feature_flags` — for rolling out portal features