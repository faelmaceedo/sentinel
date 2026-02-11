'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Server, Database, Monitor, Cpu, Save, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner'; // Integração Sonner

export default function AddAssetPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Estado do Formulário
  const [formData, setFormData] = useState({
    name: '',
    ip: '',
    port: '80',
    category: 'server' // Valor padrão
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('assets').insert([
        {
          name: formData.name,
          ip: formData.ip,
          port: Number(formData.port),
          category: formData.category
        }
      ]);

      if (error) throw error;

      // FEEDBACK TÁTICO (Sucesso)
      toast.success('Ativo registrado no sistema', {
        description: `${formData.name} (${formData.ip}) agora está sendo monitorado.`,
        duration: 4000,
      });

      // Sucesso: Volta para o Dashboard
      router.push('/dashboard');
      router.refresh(); 

    } catch (error: any) {
      // FEEDBACK TÁTICO (Erro)
      toast.error('Falha na operação', {
        description: error.message || 'Não foi possível conectar ao banco de dados.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header com Botão Voltar */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => router.back()} 
          className="mr-4 p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Novo Ativo</h1>
          <p className="text-zinc-400 mt-1">Cadastrar equipamento para monitoramento</p>
        </div>
      </div>

      {/* Formulário */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Nome e IP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Nome do Ativo</label>
              <input 
                name="name"
                required
                placeholder="Ex: SRV-AD-01"
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Endereço IP / Host</label>
              <input 
                name="ip"
                required
                placeholder="Ex: 192.168.0.10"
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* Categoria e Porta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Classe (Categoria)</label>
              <div className="relative">
                <select 
                  name="category"
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="server">Servidor Físico</option>
                  <option value="vm">Máquina Virtual (VM)</option>
                  <option value="workstation">Estação de Trabalho</option>
                  <option value="iot">IoT / Câmera</option>
                </select>
                {/* Ícones Decorativos baseados na seleção */}
                <div className="absolute right-3 top-3 pointer-events-none text-zinc-500">
                  {formData.category === 'server' && <Server className="w-5 h-5" />}
                  {formData.category === 'vm' && <Database className="w-5 h-5" />}
                  {formData.category === 'workstation' && <Monitor className="w-5 h-5" />}
                  {formData.category === 'iot' && <Cpu className="w-5 h-5" />}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Porta TCP</label>
              <input 
                name="port"
                type="number"
                defaultValue="80"
                onChange={handleChange}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          {/* Botão Salvar */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              {loading ? (
                <span className="animate-pulse">Registrando no Sistema...</span>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  CADASTRAR ATIVO
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}