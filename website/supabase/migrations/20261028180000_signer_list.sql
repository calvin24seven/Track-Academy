-- Signer list for the dashboard: search, filters, paging, and whether each signer
-- also emailed councillors (matched on the browser session id both actions share).

alter table public.petition_signatures
  add column if not exists session_id text check (char_length(session_id) <= 40);
create index if not exists petition_session_idx on public.petition_signatures (session_id);
create index if not exists actions_session_idx on public.campaign_actions (session_id) where action = 'email_sent';

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
               consent_council, consent_updates, ref, emailed
        from f order by created_at desc
        limit greatest(1, least(lim, 50000)) offset greatest(0, off)
      ) r
    ), '[]'::json)
  ) into result;
  return result;
end;
$$;
revoke execute on function public.campaign_signers(text, boolean, boolean, boolean, int, int) from public, anon;
grant execute on function public.campaign_signers(text, boolean, boolean, boolean, int, int) to authenticated;
