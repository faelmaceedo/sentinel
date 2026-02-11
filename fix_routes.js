const fs = require('fs');
const path = require('path');

console.log('🔧 NEXUS AUTO-REPAIR: Iniciando correção de rotas...');

const dashboardPath = path.join(__dirname, 'app', 'dashboard');

// Definição das Páginas que Faltam
const routes = [
  {
    folder: 'servers',
    title: 'Servidores Físicos',
    iconImport: "import { Server } from 'lucide-react';",
    iconComponent: '<Server className="w-8 h-8 mr-3 text-blue-500" />',
    category: 'server',
    desc: 'Status do Datacenter Principal'
  },
  {
    folder: 'vms',
    title: 'Virtual Machines',
    iconImport: "import { Database } from 'lucide-react';",
    iconComponent: '<Database className="w-8 h-8 mr-3 text-purple-500" />',
    category: 'vm',
    desc: 'Ambientes Virtualizados (Cluster A)'
  },
  {
    folder: 'workstations',
    title: 'Estações de Trabalho',
    iconImport: "import { Monitor } from 'lucide-react';",
    iconComponent: '<Monitor className="w-8 h-8 mr-3 text-pink-500" />',
    category: 'workstation',
    desc: 'Monitoramento de Desktops Críticos'
  },
  {
    folder: 'iot',
    title: 'Sensores IoT & Câmeras',
    iconImport: "import { Cpu } from 'lucide-react';",
    iconComponent: '<Cpu className="w-8 h-8 mr-3 text-orange-500" />',
    category: 'iot',
    desc: 'Dispositivos de Borda e Segurança'
  }
];

// Verifica se a pasta dashboard existe
if (!fs.existsSync(dashboardPath)) {
  console.error('❌ ERRO CRÍTICO: Pasta app/dashboard não encontrada!');
  process.exit(1);
}

// Cria as rotas
routes.forEach(route => {
  const dirPath = path.join(dashboardPath, route.folder);
  const filePath = path.join(dirPath, 'page.tsx');

  // 1. Cria a pasta se não existir
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`📁 Pasta criada: app/dashboard/${route.folder}`);
  }

  // 2. Conteúdo do Arquivo
  const content = `'use client';
import { AssetGrid } from '@/components/AssetGrid';
${route.iconImport}

export default function ${capitalize(route.folder)}Page() {
  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-zinc-800">
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center">
          ${route.iconComponent}
          ${route.title}
        </h1>
        <p className="text-zinc-400 mt-1">${route.desc}</p>
      </div>
      <AssetGrid category="${route.category}" />
    </div>
  );
}
`;

  // 3. Escreve o arquivo
  fs.writeFileSync(filePath, content);
  console.log(`✅ Arquivo gerado: app/dashboard/${route.folder}/page.tsx`);
});

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

console.log('🚀 CORREÇÃO CONCLUÍDA. Reinicie o servidor.');