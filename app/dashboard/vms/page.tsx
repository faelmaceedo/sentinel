'use client';
import { AssetGrid } from '@/components/AssetGrid';
import { Database } from 'lucide-react';

export default function VmsPage() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <Database className="w-8 h-8 mr-3 text-purple-500" />
          Virtual Machines
        </h1>
        <p className="text-zinc-400 mt-1">Ambientes Virtualizados (Cluster A)</p>
      </div>
      <AssetGrid category="vm" />
    </div>
  );
}
