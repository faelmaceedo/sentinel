import { NextResponse } from 'next/server';
import ping from 'ping';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { ip, id } = await request.json();
    const res = await ping.promise.probe(ip, { timeout: 2 });
    const status = res.alive ? 'online' : 'offline';
    const latency = res.alive && typeof res.time === 'number' ? Math.round(res.time) : 0;

    if (id) {
      // TÁTICA: Só grava no banco se o último registro for mais antigo que 60 segundos
      // Isso economiza espaço sem perder o histórico de tendências.
      const { data: lastEntry } = await supabase
        .from('ping_history')
        .select('created_at')
        .eq('asset_id', id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const now = new Date();
      const lastTime = lastEntry ? new Date(lastEntry.created_at) : new Date(0);
      
      // Se passou mais de 60s ou se o status mudou (crítico para detectar quedas)
      if (now.getTime() - lastTime.getTime() > 60000) {
        await supabase.from('ping_history').insert({
          asset_id: id,
          status,
          latency
        });
      }
    }

    return NextResponse.json({ status, latency });
  } catch (error) {
    return NextResponse.json({ status: 'offline', latency: 0 });
  }
}