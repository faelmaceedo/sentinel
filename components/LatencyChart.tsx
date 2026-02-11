'use client';

import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';

interface ChartProps {
  data: { latency: number }[];
  color: string;
}

export function LatencyChart({ data, color }: ChartProps) {
  // Se não tiver dados suficientes, mostra uma linha vazia
  if (!data || data.length < 2) return <div className="h-10 w-full bg-zinc-900/20 rounded"></div>;

  return (
    <div className="h-12 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <YAxis hide domain={[0, 'dataMax + 20']} />
          <Area 
            type="monotone" 
            dataKey="latency" 
            stroke={color} 
            strokeWidth={2}
            fill={`url(#gradient-${color})`} 
            isAnimationActive={false} // Desliga animação para performance real-time
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}