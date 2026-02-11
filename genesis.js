const fs = require('fs');
const path = require('path');

console.log('⚡ NEXUS: Iniciando reescrita total do sistema...');

// 1. Configuração do Tailwind (Blindada para v3)
const tailwindConfig = `import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        card: "#18181b",
        "card-foreground": "#fafafa",
        primary: "#3b82f6", 
        "primary-foreground": "#18181b",
        border: "#27272a",
        muted: "#27272a",
      },
    },
  },
  plugins: [],
};
export default config;`;

// 2. CSS Global (Sem @apply complexos para evitar erros)
const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #09090b;
  --foreground: #fafafa;
}

body {
  background-color: #09090b;
  color: #fafafa;
}

/* Utilitários Visuais */
@layer utilities {
  .glow-green { box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); border-color: rgba(34, 197, 94, 0.5); }
  .glow-red { box-shadow: 0 0 15px rgba(239, 68, 68, 0.4); border-color: rgba(239, 68, 68, 0.5); }
  .glass-panel { @apply bg-zinc-900/50 backdrop-blur-md border border-zinc-800; }
}`;

// 3. Utils (Para lidar com classes condicionais)
const utilsTs = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

// 4. Sidebar Component
const sidebarTsx = `'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, LayoutDashboard, Server, Database, Monitor, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Visão Geral', href: '/', icon: LayoutDashboard },
  { label: 'Servidores', href: '/servers', icon: Server },
  { label: 'VMs', href: '/vms', icon: Database },
  { label: 'Estações', href: '/workstations', icon: Monitor },
  { label: 'IoT', href: '/iot', icon: Cpu },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <ShieldCheck className="w-6 h-6 text-blue-500 mr-2" />
        <span className="font-bold text-lg text-white">SENTINEL</span>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} 
              className={cn("flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all", 
              isActive ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" : "text-zinc-400 hover:bg-zinc-900 hover:text-white")}>
              <Icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}`;

// 5. Layout Principal
const layoutTsx = `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEPLAN SENTINEL",
  description: "NOC Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-zinc-950 flex text-white">
          <Sidebar />
          <main className="flex-1 ml-64 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}`;

// 6. Dashboard Page (Simples e Funcional)
const pageTsx = `'use client';
import { Activity, Server, AlertTriangle } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Visão Geral Tática</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 flex justify-between">
          <div><p className="text-zinc-400">Total Ativos</p><p className="text-3xl font-bold">12</p></div>
          <Server className="text-blue-500" />
        </div>
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 flex justify-between">
          <div><p className="text-zinc-400">Online</p><p className="text-3xl font-bold text-green-500">10</p></div>
          <Activity className="text-green-500" />
        </div>
        <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 flex justify-between">
          <div><p className="text-zinc-400">Offline</p><p className="text-3xl font-bold text-red-500">2</p></div>
          <AlertTriangle className="text-red-500" />
        </div>
      </div>

      {/* Grid de Exemplo */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Monitoramento em Tempo Real</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {/* Card 1 */}
           <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
              <div className="flex justify-between items-start">
                 <h3 className="font-bold">SRV-AD-01</h3>
                 <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">ONLINE</span>
              </div>
              <p className="text-zinc-500 text-sm mt-1">192.168.1.10</p>
           </div>
           {/* Card 2 */}
           <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
              <div className="flex justify-between items-start">
                 <h3 className="font-bold">SRV-ARQUIVOS</h3>
                 <span className="text-xs bg-red-900/30 text-red-400 px-2 py-1 rounded">OFFLINE</span>
              </div>
              <p className="text-zinc-500 text-sm mt-1">192.168.1.20</p>
           </div>
        </div>
      </div>
    </div>
  );
}`;

// MAPA DE ARQUIVOS
const files = [
  { path: 'tailwind.config.ts', content: tailwindConfig },
  { path: 'app/globals.css', content: globalCss },
  { path: 'lib/utils.ts', content: utilsTs },
  { path: 'components/Sidebar.tsx', content: sidebarTsx },
  { path: 'app/layout.tsx', content: layoutTsx },
  { path: 'app/page.tsx', content: pageTsx },
];

// CRIAÇÃO DAS PASTAS
const dirs = ['components', 'lib'];
dirs.forEach(dir => {
  if (!fs.existsSync(path.join(__dirname, dir))) fs.mkdirSync(path.join(__dirname, dir));
});

// ESCRITA DOS ARQUIVOS
files.forEach(file => {
  fs.writeFileSync(path.join(__dirname, file.path), file.content);
  console.log('✅ Arquivo gerado: ' + file.path);
});

console.log('🚀 GÊNESIS CONCLUÍDO. Rode "npm run dev" agora.');