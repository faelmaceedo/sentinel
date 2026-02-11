'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, Clock } from 'lucide-react';

export function HistoryModal({ assetId, assetName, onClose }: { assetId: string, assetName: string, onClose: () => void }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      const { data: logs } = await supabase
        .from('ping_history')
        .select('latency, created_at')
        .eq('asset_id', assetId)
        .order('created_at', { ascending: true })
        .limit(100); // Pegar os últimos 100 pontos

      const formatted = logs?.map(l => ({
        time: new Date(l.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ms: l.latency
      }));
      
      setData(formatted || []);
      setLoading(false);
    }
    fetchHistory();
  }, [assetId]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 w-full max-w-3xl rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Histórico de Performance: {assetName}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">✕</button>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" /></div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="time" stroke="#71717a" fontSize={10} />
                <YAxis stroke="#71717a" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46' }} />
                <Line type="monotone" dataKey="ms" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}