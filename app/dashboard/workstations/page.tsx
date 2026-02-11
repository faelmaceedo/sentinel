'use client';
import { AssetGrid } from '@/components/AssetGrid';
import { Monitor } from 'lucide-react';

export default function WorkstationsPage() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <Monitor className="w-8 h-8 mr-3 text-pink-500" />
          Estações de Trabalho
        </h1>
        <p className="text-zinc-400 mt-1">Monitoramento de Desktops Críticos</p>
      </div>
      <AssetGrid category="workstation" />
    </div>
  );
}
