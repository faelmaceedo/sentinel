'use client';

import { useState, useEffect } from 'react';
import { Server, RefreshCw, Wifi, WifiOff, Trash2 } from 'lucide-react';
import { LatencyChart } from './LatencyChart';
import { HistoryModal } from './HistoryModal'; // Importando o novo modal
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner'; 

interface AssetProps {
  id: string;
  name: string;
  ip: string;
  port: number;
  onDelete: (id: string) => void;
}

interface PingData {
  time: number;
  latency: number;
}

export function AssetCard({ id, name, ip, port, onDelete }: AssetProps) {
  const [status, setStatus] = useState<'pending' | 'online' | 'offline'>('pending');
  const [latency, setLatency] = useState(0);
  const [history, setHistory] = useState<PingData[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // ESTADO PARA O MODAL
  const [showHistory, setShowHistory] = useState(false);

  const checkStatus = async () => {
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, port, id }), 
      });
      const data = await res.json();
      
      setStatus(data.status);
      setLatency(data.latency);

      setHistory(prev => {
        const newData = [...prev, { time: Date.now(), latency: data.status === 'online' ? data.latency : 0 }];
        return newData.slice(-20);
      });

    } catch (error) {
      setStatus('offline');
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no botão abra o modal
    if (!confirm(`Tem certeza que deseja remover ${name}?`)) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('assets').delete().eq('id', id);
      if (error) throw error;
      toast.success('Ativo removido');
      onDelete(id);
    } catch (error) {
      toast.error('Erro ao deletar');
      setIsDeleting(false);
    }
  };

  const isOnline = status === 'online';
  const isOffline = status === 'offline';
  const chartColor = isOnline ? '#22c55e' : isOffline ? '#ef4444' : '#71717a';

  return (
    <>
      <div 
        onClick={() => setShowHistory(true)} // ABRE O MODAL AO CLICAR NO CARD
        className={`
          relative p-5 rounded-xl border transition-all duration-300 overflow-hidden group cursor-pointer
          ${isOnline ? 'bg-zinc-900/80 border-green-500/20 hover:border-green-500/50 hover:bg-zinc-800/80' : ''}
          ${isOffline ? 'bg-red-950/10 border-red-500/20 hover:border-red-500/50' : ''}
          ${status === 'pending' ? 'bg-zinc-900 border-zinc-800' : ''}
          ${isDeleting ? 'opacity-50 pointer-events-none' : ''}
        `}
      >
        
        {/* Botão de Delete */}
        <button 
          onClick={handleDelete}
          className="absolute top-3 right-3 p-2 rounded-full bg-zinc-950/50 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100 z-20"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2 pr-8">
            <div className="flex items-center space-x-3">
              <div className={`p-2.5 rounded-lg border backdrop-blur-md ${isOnline ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-zinc-800 border-zinc-700 text-zinc-500'}`}>
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white tracking-wide text-sm">{name}</h3>
                <p className="text-xs text-zinc-500 font-mono tracking-tighter">{ip}</p>
              </div>
            </div>
          </div>

          <div className="flex mb-4">
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

          <div>
            <div className="flex justify-between items-end mb-1">
               <span className="text-[10px] text-zinc-500 uppercase font-semibold">Live Latency</span>
               {isOnline && <span className="text-xs font-mono text-white">{latency}ms</span>}
            </div>
            <LatencyChart data={history} color={chartColor} />
          </div>
        </div>
      </div>

      {/* RENDERIZAÇÃO CONDICIONAL DO MODAL */}
      {showHistory && (
        <HistoryModal 
          assetId={id} 
          assetName={name} 
          onClose={() => setShowHistory(false)} 
        />
      )}
    </>
  );
}