import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  // echo webhook for now
  const payload = await req.json().catch(() => ({}));
  return new Response(JSON.stringify({ ok: true, received: payload }), { headers: { 'content-type': 'application/json' } });
});


