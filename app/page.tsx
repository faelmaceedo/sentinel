'use client';
import { ASSETS } from '@/lib/constants';
import { AssetCard } from '@/components/AssetCard';
import { ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header da Página */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Centro de Comando</h1>
          <p className="text-zinc-400 mt-1">Monitoramento Ativo de Infraestrutura</p>
        </div>
        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-400 font-bold">SYSTEM ONLINE</span>
        </div>
      </div>

      {/* Grid de Monitoramento */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-blue-500" />
          Ativos Críticos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASSETS.map((asset) => (
            <AssetCard 
              key={asset.id}
              name={asset.name}
              ip={asset.ip}
              port={asset.port}
            />
          ))}
        </div>
      </div>

      {/* Área de Logs (Visual) */}
      <div className="mt-10 p-4 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-zinc-500 h-32 overflow-hidden opacity-70">
        <p>[SYSTEM] Initializing network scan protocols...</p>
        <p>[SYSTEM] Loaded {ASSETS.length} assets from configuration.</p>
        <p className="text-blue-500">[NETWORK] Ping sweep active. Listening on ports...</p>
      </div>

    </div>
  );
}