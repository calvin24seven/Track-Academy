// resend-test: sends ONE labelled test email to webmaster@trackacademy.co.uk to prove
// Resend + mail.trackacademy.co.uk + the Supabase secret work. It refuses to send again
// once a 'resend_test' row exists in email_log, so the public URL can't be used to spam.
// Sent once on 28 Oct 2026 (Resend id 01a1832c-6b9c-7cb4-85e7-8cfc9b063e63). Safe to delete.
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TO = 'webmaster@trackacademy.co.uk';
const FROM = 'Protect Brent Athletics <campaign@mail.trackacademy.co.uk>';

const db = (path: string, init: RequestInit = {}) =>
  fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}`, 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });

Deno.serve(async () => {
  if (!RESEND_API_KEY) return Response.json({ sent: false, reason: 'RESEND_API_KEY not set' }, { status: 503 });

  const prior = await (await db("email_log?kind=eq.resend_test&status=eq.sent&select=id&limit=1")).json();
  if (Array.isArray(prior) && prior.length) return Response.json({ sent: false, reason: 'test already sent' }, { status: 409 });

  const subject = 'TEST: Protect Brent Athletics email alerts';
  const html = `<div style="font:15px/1.5 Arial,sans-serif;color:#1c1e26;max-width:600px">
    <p><b>This is a test. No action needed.</b></p>
    <p>It confirms that campaign alerts can be sent from <b>campaign@mail.trackacademy.co.uk</b> through Resend and Supabase.</p>
    <p>When someone offers help or shares a story on <a href="https://trackacademy.co.uk/protect-brent-athletics">the campaign page</a>, an alert like this goes to the campaign contact.</p>
  </div>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': 'pba-resend-test-1' },
    body: JSON.stringify({ from: FROM, to: [TO], subject, html, reply_to: TO }),
  });
  const body = await res.json().catch(() => ({}));
  await db('email_log', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({
      kind: 'resend_test', to_addresses: [TO], subject,
      resend_id: body?.id ?? null, status: res.ok ? 'sent' : 'failed',
      error: res.ok ? null : JSON.stringify(body).slice(0, 2000),
    }),
  });
  return Response.json({ sent: res.ok, status: res.status, resend: body }, { status: res.ok ? 200 : 502 });
});
