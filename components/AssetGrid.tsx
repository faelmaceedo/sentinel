'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AssetCard } from '@/components/AssetCard';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface AssetGridProps {
  category?: string;
}

interface Asset {
  id: string;
  name: string;
  ip: string;
  port: number;
  category: string;
}

export function AssetGrid({ category }: AssetGridProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca inicial
  useEffect(() => {
    async function fetchAssets() {
      let query = supabase.from('assets').select('*').order('created_at', { ascending: true });
      
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      
      if (!error && data) {
        setAssets(data);
      }
      setLoading(false);
    }

    fetchAssets();
  }, [category]);

  // Função chamada quando um card é deletado
  const handleAssetDelete = (deletedId: string) => {
    setAssets((prevAssets) => prevAssets.filter(asset => asset.id !== deletedId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-zinc-500 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/20">
        <ShieldAlert className="w-12 h-12 mb-4 opacity-50" />
        <p>Nenhum ativo encontrado nesta frequência.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id}
          id={asset.id}         // Passando o ID
          name={asset.name}
          ip={asset.ip}
          port={asset.port}
          onDelete={handleAssetDelete} // Passando a função
        />
      ))}
    </div>
  );
}