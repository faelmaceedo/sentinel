import { 
  LayoutDashboard, 
  Server, 
  Database, 
  Monitor, 
  Cpu, 
  ShieldCheck,
  Activity
} from 'lucide-react';

// --- NAVEGAÇÃO (SIDEBAR) ---
export const NAV_ITEMS = [
  // O link da visão geral já estava certo
  { label: 'Visão Geral', href: '/dashboard', icon: LayoutDashboard },

  // CORREÇÃO: Adicionado '/dashboard' antes de cada rota
  { label: 'Servidores', href: '/dashboard/servers', icon: Server },      // Antes estava '/servers'
  { label: 'VMs', href: '/dashboard/vms', icon: Database },               // Antes estava '/vms'
  { label: 'Estações', href: '/dashboard/workstations', icon: Monitor },  // Antes estava '/workstations'
  { label: 'IoT & Sensores', href: '/dashboard/iot', icon: Cpu },         // Antes estava '/iot'
];
// --- LISTA DE ATIVOS ---
export const ASSETS = [
  // SERVIDORES
  { 
    id: 'srv-01', 
    name: 'DNS-Google', 
    ip: '8.8.8.8', 
    port: 53, 
    category: 'server' 
  },
  { 
    id: 'srv-02', 
    name: 'SRV-LOCAL-TEST', 
    ip: '192.168.1.99', 
    port: 445, 
    category: 'server' 
  },
  // VMS
  { 
    id: 'vm-01', 
    name: 'Cloudflare-Web', 
    ip: '1.1.1.1', 
    port: 80, 
    category: 'vm' 
  },
  // IOT
  { 
    id: 'iot-01', 
    name: 'Câmera Entrada', 
    ip: '192.168.15.55', 
    port: 80, 
    category: 'iot' 
  },
  { 
  id: 'ws-01', 
  name: 'PC-DIRETORIA', 
  ip: '192.168.1.50', 
  port: 3389, // RDP Port
  category: 'workstations' 
},
];