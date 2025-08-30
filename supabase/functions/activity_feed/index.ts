import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const team_id = url.searchParams.get('team_id');
  if (!team_id) return new Response(JSON.stringify({ error: 'team_id required' }), { status: 400 });
  return new Response(JSON.stringify({ items: [] }), { headers: { 'content-type': 'application/json' } });
});


