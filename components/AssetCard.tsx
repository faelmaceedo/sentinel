'use client';

import { useState, useEffect } from 'react';
import { Server, Activity, AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { LatencyChart } from './LatencyChart';

interface AssetProps {
  name: string;
  ip: string;
  port: number;
}

// Tipo para o histórico do gráfico
interface PingData {
  time: number;
  latency: number;
}

export function AssetCard({ name, ip, port }: AssetProps) {
  const [status, setStatus] = useState<'pending' | 'online' | 'offline'>('pending');
  const [latency, setLatency] = useState(0);
  const [history, setHistory] = useState<PingData[]>([]); // Array para o gráfico

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, port }),
      });
      const data = await res.json();
      
      setStatus(data.status);
      setLatency(data.latency);

      // Adiciona ao histórico (Mantém apenas os últimos 20 pontos)
      setHistory(prev => {
        const newData = [...prev, { time: Date.now(), latency: data.status === 'online' ? data.latency : 0 }];
        return newData.slice(-20);
      });

    } catch {
      setStatus('offline');
      setHistory(prev => [...prev, { time: Date.now(), latency: 0 }].slice(-20));
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 3000); // Scan mais rápido (3s) para ver o gráfico andar
    return () => clearInterval(interval);
  }, []);

  const isOnline = status === 'online';
  const isOffline = status === 'offline';
  const chartColor = isOnline ? '#22c55e' : isOffline ? '#ef4444' : '#71717a';

  return (
    <div className={`
      relative p-5 rounded-xl border transition-all duration-300 overflow-hidden group
      ${isOnline ? 'bg-zinc-900/80 border-green-500/20 hover:border-green-500/50' : ''}
      ${isOffline ? 'bg-red-950/10 border-red-500/20 hover:border-red-500/50' : ''}
      ${status === 'pending' ? 'bg-zinc-900 border-zinc-800' : ''}
    `}>
      {/* Background Grid Effect (Opcional) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-lg border backdrop-blur-md ${isOnline ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white tracking-wide text-sm">{name}</h3>
              <p className="text-xs text-zinc-500 font-mono tracking-tighter">{ip}:{port}</p>
            </div>
          </div>
          
          {/* Badge de Status Minimalista */}
          <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border
            ${isOnline ? 'bg-green-500/10 text-green-400 border-green-500/20' : ''}
            ${isOffline ? 'bg-red-500/10 text-red-400 border-red-500/20' : ''}
            ${status === 'pending' ? 'bg-zinc-800 text-zinc-400 border-zinc-700' : ''}
          `}>
            {status === 'pending' ? <RefreshCw className="w-3 h-3 animate-spin"/> : 
             isOnline ? <Wifi className="w-3 h-3"/> : <WifiOff className="w-3 h-3"/>}
            <span>{status}</span>
          </div>
        </div>

        {/* Área do Gráfico */}
        <div className="mt-4">
          <div className="flex justify-between items-end mb-1">
             <span className="text-[10px] text-zinc-500 uppercase font-semibold">Live Latency</span>
             {isOnline && <span className="text-xs font-mono text-white">{latency}ms</span>}
          </div>
          <LatencyChart data={history} color={chartColor} />
        </div>
      </div>
    </div>
  );
}