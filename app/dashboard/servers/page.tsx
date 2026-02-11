'use client';
import { AssetGrid } from '@/components/AssetGrid';
import { Server } from 'lucide-react';

export default function ServersPage() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <Server className="w-8 h-8 mr-3 text-blue-500" />
          Servidores Físicos
        </h1>
        <p className="text-zinc-400 mt-1">Status do Datacenter Principal</p>
      </div>
      <AssetGrid category="server" />
    </div>
  );
}
