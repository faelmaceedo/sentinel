'use client';
import { AssetGrid } from '@/components/AssetGrid';
import { ShieldCheck, Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Visão Geral Tática</h1>
          <p className="text-zinc-400 mt-1">Monitoramento Global da Infraestrutura</p>
        </div>
        <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800">
          <Activity className="w-4 h-4 text-green-500" />
          <span className="text-xs text-zinc-300 font-mono">LIVE FEED</span>
        </div>
      </div>

      {/* Grid Geral (Sem filtro = Mostra tudo) */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-blue-500" />
          Todos os Ativos
        </h2>
        <AssetGrid />
      </div>
    </div>
  );
}