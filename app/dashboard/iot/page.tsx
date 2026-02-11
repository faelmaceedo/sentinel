'use client';
import { AssetGrid } from '@/components/AssetGrid';
import { Cpu } from 'lucide-react';

export default function IotPage() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          <Cpu className="w-8 h-8 mr-3 text-orange-500" />
          Sensores IoT & Câmeras
        </h1>
        <p className="text-zinc-400 mt-1">Dispositivos de Borda e Segurança</p>
      </div>
      <AssetGrid category="iot" />
    </div>
  );
}
