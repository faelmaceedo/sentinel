'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';
// IMPORTANTE: Trazendo os links corrigidos do arquivo externo
import { NAV_ITEMS } from '@/lib/constants'; 
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col fixed left-0 top-0 z-50">
      {/* Header */}
      <div className="h-20 flex items-center px-6 border-b border-zinc-800">
        <ShieldCheck className="w-8 h-8 text-blue-500 mr-3" />
        <div>
          <span className="font-bold text-lg text-white block leading-none">SENTINEL</span>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">NOC Dashboard</span>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href} // Agora vai ler /dashboard/servers corretamente
              className={cn(
                "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" 
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white border border-transparent"
              )}
            >
              <Icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-white")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
        <div className="flex items-center">
          <span className="relative flex h-2 w-2 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <div>
            <p className="text-xs text-zinc-300 font-semibold">Sistema Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}