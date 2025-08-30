import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
  try {
    const body = await req.json();
    const { task_id, user_id, assigned_by } = body ?? {};
    if (!task_id || !user_id || !assigned_by) {
      return new Response(JSON.stringify({ error: 'task_id,user_id,assigned_by required' }), { status: 400 });
    }
    return new Response(JSON.stringify({ id: crypto.randomUUID(), task_id, user_id, assigned_by }), {
      headers: { 'content-type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
});


