'use client';
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
}