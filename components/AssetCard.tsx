'use client';

import { useState, useEffect } from 'react';
import { Server, Activity, AlertCircle, RefreshCw } from 'lucide-react';

interface AssetProps {
  name: string;
  ip: string;
  port: number;
}

export function AssetCard({ name, ip, port }: AssetProps) {
  const [status, setStatus] = useState<'pending' | 'online' | 'offline'>('pending');
  const [latency, setLatency] = useState(0);

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
    } catch {
      setStatus('offline');
    }
  };

  // Roda no início e a cada 5 segundos
  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  // Definição de Cores Dinâmicas
  const isOnline = status === 'online';
  const isOffline = status === 'offline';
  
  return (
    <div className={`
      relative p-4 rounded-xl border transition-all duration-500
      ${isOnline ? 'bg-zinc-900/50 border-green-500/30 glow-green' : ''}
      ${isOffline ? 'bg-red-950/10 border-red-500/30 glow-red' : ''}
      ${status === 'pending' ? 'bg-zinc-900 border-zinc-800' : ''}
    `}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded bg-zinc-950 border border-zinc-800">
            <Server className={`w-5 h-5 ${isOnline ? 'text-blue-400' : 'text-zinc-500'}`} />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-wide">{name}</h3>
            <p className="text-xs text-zinc-500 font-mono">{ip}:{port}</p>
          </div>
        </div>
        
        {/* Badge de Status */}
        <div className={`px-2 py-1 rounded text-xs font-bold flex items-center
          ${isOnline ? 'bg-green-500/10 text-green-400' : ''}
          ${isOffline ? 'bg-red-500/10 text-red-400' : ''}
          ${status === 'pending' ? 'bg-zinc-800 text-zinc-400' : ''}
        `}>
          {status === 'pending' ? <RefreshCw className="w-3 h-3 animate-spin mr-1"/> : 
           isOnline ? <Activity className="w-3 h-3 mr-1"/> : <AlertCircle className="w-3 h-3 mr-1"/>}
          {status.toUpperCase()}
        </div>
      </div>

      {isOnline && (
        <div className="mt-2 text-right">
          <span className="text-xs text-emerald-500 font-mono">Latency: {latency}ms</span>
        </div>
      )}
    </div>
  );
}