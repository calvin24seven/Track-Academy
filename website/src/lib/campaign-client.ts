/**
 * Tiny Supabase REST client for the campaign pages (no SDK needed).
 * Uses the Track Academy project by default; PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY can override it.
 * The publishable key is safe in the browser: row-level security controls access.
 */

// The project URL and publishable key are public by design (access is enforced by RLS),
// so they are built in as defaults. Build env vars can still override them (e.g. a test project).
const URL_ = (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined) || 'https://ddgchywxajftqdukcjbv.supabase.co';
const KEY = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined) || 'sb_publishable_FPIt9s1iy96nbU6p5JNHUw_S5xo1G9R';

export const supabaseReady = Boolean(URL_ && KEY);

function headers(token?: string): Record<string, string> {
  // Publishable keys go in `apikey` only; Authorization is sent just for signed-in admins.
  const h: Record<string, string> = { apikey: KEY ?? '', 'Content-Type': 'application/json' };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export type InsertResult = { ok: true } | { ok: false; duplicate?: boolean; error: string };

export async function insert(table: string, row: Record<string, unknown>): Promise<InsertResult> {
  if (!supabaseReady) return { ok: false, error: 'not_configured' };
  try {
    const res = await fetch(`${URL_}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...headers(), Prefer: 'return=minimal' },
      body: JSON.stringify(row),
      keepalive: true,
    });
    if (res.ok) return { ok: true };
    const body = await res.json().catch(() => ({}));
    return { ok: false, duplicate: body?.code === '23505', error: body?.message ?? res.statusText };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

export async function rpc<T = unknown>(fn: string, args: Record<string, unknown> = {}, token?: string): Promise<T | null> {
  if (!supabaseReady) return null;
  const res = await fetch(`${URL_}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.message ?? res.statusText);
  return res.json();
}

export async function select<T = unknown>(path: string, token: string): Promise<T> {
  const res = await fetch(`${URL_}/rest/v1/${path}`, { headers: headers(token) });
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.message ?? res.statusText);
  return res.json();
}

export async function patch(path: string, body: Record<string, unknown>, token: string) {
  const res = await fetch(`${URL_}/rest/v1/${path}`, {
    method: 'PATCH',
    headers: { ...headers(token), Prefer: 'return=minimal' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.message ?? res.statusText);
}

export async function insertAuthed(table: string, row: Record<string, unknown>, token: string) {
  const res = await fetch(`${URL_}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...headers(token), Prefer: 'return=minimal' },
    body: JSON.stringify(row),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.message ?? res.statusText);
}

/** Magic-link sign-in for the dashboard. */
export async function sendMagicLink(email: string, redirectTo: string) {
  const res = await fetch(`${URL_}/auth/v1/otp`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ email, create_user: false, options: { email_redirect_to: redirectTo } }),
  });
  if (!res.ok) {
    const b = await res.json().catch(() => ({}));
    throw new Error(b?.msg ?? b?.message ?? b?.error_description ?? res.statusText);
  }
}

/** Attribution: ?ref=qph is remembered for the visit and attached to every action. */
export function getRef(): string | null {
  try {
    const fromUrl = new URLSearchParams(location.search).get('ref');
    if (fromUrl) {
      const clean = fromUrl.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 60);
      sessionStorage.setItem('ptt_ref', clean);
      return clean;
    }
    return sessionStorage.getItem('ptt_ref');
  } catch {
    return null;
  }
}

export function getSessionId(): string {
  try {
    let id = localStorage.getItem('ptt_sid');
    if (!id) {
      id = crypto.randomUUID().slice(0, 36);
      localStorage.setItem('ptt_sid', id);
    }
    return id;
  } catch {
    return 'no-storage';
  }
}

export type PostcodeInfo = { postcode: string; ward: string | null; district: string | null; inBrent: boolean; outward: string };

/** Looks up ward via postcodes.io (free, no key). Only the postcode is sent. */
export async function lookupPostcode(raw: string): Promise<PostcodeInfo | null> {
  const pc = raw.trim().toUpperCase().replace(/\s+/g, '');
  if (pc.length < 5 || pc.length > 8) return null;
  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc)}`);
    if (!res.ok) return null;
    const { result } = await res.json();
    return {
      postcode: result.postcode,
      ward: result.admin_ward ?? null,
      district: result.admin_district ?? null,
      inBrent: result.admin_district === 'Brent',
      outward: result.outcode,
    };
  } catch {
    return null;
  }
}
