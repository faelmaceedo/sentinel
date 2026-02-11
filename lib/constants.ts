import { Server, Database, Monitor, Cpu } from 'lucide-react';

export const ASSETS = [
  // --- SERVIDORES ---
  { 
    id: 'srv-01', 
    name: 'DNS-Google', 
    ip: '8.8.8.8', 
    port: 53, // DNS Port
    category: 'server' 
  },
  { 
    id: 'srv-02', 
    name: 'SRV-LOCAL-TEST', 
    ip: '192.168.1.99', // IP Fictício (Vai dar OFFLINE)
    port: 445, 
    category: 'server' 
  },

  // --- WEB / VMS ---
  { 
    id: 'vm-01', 
    name: 'Cloudflare-Web', 
    ip: '1.1.1.1', 
    port: 80, // HTTP Port
    category: 'vm' 
  },

  // --- IOT ---
  { 
    id: 'iot-01', 
    name: 'Câmera Entrada', 
    ip: '192.168.15.55', // IP Fictício
    port: 80, 
    category: 'iot' 
  },
];