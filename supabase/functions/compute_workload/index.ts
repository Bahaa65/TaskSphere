import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  try {
    const { team_id } = await req.json();
    if (!team_id) return new Response(JSON.stringify({ error: 'team_id required' }), { status: 400 });
    return new Response(JSON.stringify({ workloads: {} }), { headers: { 'content-type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});


