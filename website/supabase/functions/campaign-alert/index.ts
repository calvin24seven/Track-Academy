// campaign-alert: emails the campaign contact about new skills offers and stories.
//
// Called by a database trigger after each insert. It never trusts the request body:
// it claims rows where alerted_at is null, emails them, and releases the claim if
// sending fails. Calling it with nothing new to send does nothing.
//
// Secrets (Supabase → Edge Functions → Secrets):
//   RESEND_API_KEY  required
//   ALERT_TO        optional, comma-separated (default patrik@trackacademy.co.uk)
//   ALERT_FROM      optional (default "Protect Brent Athletics <campaign@mail.trackacademy.co.uk>";
//                   needs mail.trackacademy.co.uk verified in Resend)
// Every send is recorded in public.email_log.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically.

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const ALERT_TO = (Deno.env.get('ALERT_TO') ?? 'patrik@trackacademy.co.uk').split(',').map((s) => s.trim()).filter(Boolean);
const ALERT_FROM = Deno.env.get('ALERT_FROM') ?? 'Protect Brent Athletics <campaign@mail.trackacademy.co.uk>';
const DASHBOARD = 'https://trackacademy.co.uk/protect-brent-athletics/dashboard/';

const db = (path: string, init: RequestInit = {}) =>
  fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
      ...(init.headers ?? {}),
    },
  });

/** Atomically marks unsent rows as sent and returns them. */
async function claim(table: string, columns: string) {
  const res = await db(`${table}?alerted_at=is.null&select=${columns}`, {
    method: 'PATCH',
    body: JSON.stringify({ alerted_at: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`claim ${table}: ${res.status} ${await res.text()}`);
  return (await res.json()) as Record<string, unknown>[];
}

async function logEmail(row: Record<string, unknown>) {
  await db('email_log', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ kind: 'campaign_alert', to_addresses: ALERT_TO, ...row }) })
    .catch((e) => console.error('email_log', String(e)));
}

async function release(table: string, ids: string[]) {
  if (!ids.length) return;
  await db(`${table}?id=in.(${ids.join(',')})`, { method: 'PATCH', body: JSON.stringify({ alerted_at: null }) });
}

const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const AGE: Record<string, string> = { under_13: 'Under 13', '13_17': '13–17', '18_plus': '18+', unknown: 'Child, age not given' };

function render(offers: Record<string, unknown>[], stories: Record<string, unknown>[]) {
  const block = (title: string, body: string) =>
    `<div style="border:1px solid #d6d8e1;padding:16px;margin:0 0 12px;font:15px/1.5 Arial,sans-serif;color:#1c1e26">
       <p style="margin:0 0 8px;font-weight:bold;color:#112a8a">${title}</p>${body}</div>`;

  const offerHtml = offers.map((o) =>
    block(
      `Offer of help: ${esc(o.full_name)}`,
      `<p style="margin:0">Can help with: <b>${esc(((o.skills as string[]) ?? []).join(', ') || 'not specified')}</b></p>
       ${o.details ? `<p style="margin:8px 0 0;white-space:pre-wrap">${esc(o.details)}</p>` : ''}
       <p style="margin:8px 0 0">Email: <a href="mailto:${esc(o.email)}">${esc(o.email)}</a>${o.phone ? ` · Phone: ${esc(o.phone)}` : ''}</p>`,
    )).join('');

  const storyHtml = stories.map((s) => {
    const child = s.age_band !== '18_plus';
    return block(
      `New story from ${esc(s.display_name)}${child ? ' <span style="color:#d4004f">(needs a safeguarding check)</span>' : ''}`,
      `<p style="margin:0;white-space:pre-wrap">“${esc(s.story)}”</p>
       <p style="margin:8px 0 0;color:#5b5f6e">About: ${esc(AGE[String(s.age_band)] ?? s.age_band)} · Publish OK: ${s.consent_publish ? 'yes' : 'no'} · Press OK: ${s.media_ok ? 'yes' : 'no'}${s.contact_email ? ` · <a href="mailto:${esc(s.contact_email)}">${esc(s.contact_email)}</a>` : ''}</p>`,
    );
  }).join('');

  const parts = [
    offers.length ? `${offers.length} offer${offers.length > 1 ? 's' : ''} of help` : '',
    stories.length ? `${stories.length} new stor${stories.length > 1 ? 'ies' : 'y'}` : '',
  ].filter(Boolean);
  const subject = `Protect Brent Athletics: ${parts.join(' and ')}`;
  const html = `<div style="max-width:640px">
      <p style="font:15px/1.5 Arial,sans-serif;color:#1c1e26">New on the campaign page:</p>
      ${offerHtml}${storyHtml}
      <p style="font:15px/1.5 Arial,sans-serif"><a href="${DASHBOARD}" style="color:#112a8a;font-weight:bold">Open the campaign dashboard</a> to approve stories and update offers.</p>
      <p style="font:12px/1.5 Arial,sans-serif;color:#8a8d99">Stories are not published until approved on the dashboard.</p>
    </div>`;
  // Reply goes straight to the person when there is exactly one offer; otherwise to the campaign contact.
  const replyTo = offers.length === 1 && !stories.length ? String(offers[0].email) : ALERT_TO[0];
  return { subject, html, replyTo };
}

Deno.serve(async () => {
  if (!RESEND_API_KEY) {
    // Leave everything unsent; it will go out once the key is added.
    return Response.json({ sent: false, reason: 'RESEND_API_KEY not set' }, { status: 503 });
  }

  let offers: Record<string, unknown>[] = [];
  let stories: Record<string, unknown>[] = [];
  let subject = '';
  try {
    offers = await claim('campaign_offers', 'id,full_name,email,phone,skills,details');
    stories = await claim('campaign_stories', 'id,display_name,age_band,story,consent_publish,media_ok,contact_email');
    if (!offers.length && !stories.length) return Response.json({ sent: false, reason: 'nothing new' });

    const email = render(offers, stories);
    subject = email.subject;
    const { html, replyTo } = email;
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: ALERT_FROM, to: ALERT_TO, subject, html, reply_to: replyTo }),
    });
    if (!res.ok) throw new Error(`resend: ${res.status} ${await res.text()}`);
    const { id } = await res.json();
    await logEmail({ subject, resend_id: id, status: 'sent', related: { offers: offers.map((o) => o.id), stories: stories.map((s) => s.id) } });
    return Response.json({ sent: true, offers: offers.length, stories: stories.length });
  } catch (e) {
    console.error(String(e));
    if (offers.length || stories.length) {
      await logEmail({ subject: subject || 'Protect Brent Athletics alert', status: 'failed', error: String(e).slice(0, 2000), related: { offers: offers.map((o) => o.id), stories: stories.map((s) => s.id) } });
    }
    await release('campaign_offers', offers.map((o) => String(o.id)));
    await release('campaign_stories', stories.map((s) => String(s.id)));
    return Response.json({ sent: false, error: String(e) }, { status: 500 });
  }
});
