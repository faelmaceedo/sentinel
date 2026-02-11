import { NextResponse } from 'next/server';
import net from 'net';

export async function POST(request: Request) {
  try {
    const { ip, port } = await request.json();

    const result = await checkPort(ip, port || 80);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ status: 'offline', latency: 0 });
  }
}

// Lógica de Socket TCP (O "Ping")
function checkPort(ip: string, port: number): Promise<{ status: string; latency: number }> {
  return new Promise((resolve) => {
    const start = Date.now();
    const socket = new net.Socket();

    const onConnect = () => {
      const latency = Date.now() - start;
      socket.destroy();
      resolve({ status: 'online', latency });
    };

    const onError = () => {
      socket.destroy();
      resolve({ status: 'offline', latency: 0 });
    };

    socket.setTimeout(2000); // 2 segundos de timeout
    socket.on('connect', onConnect);
    socket.on('timeout', onError);
    socket.on('error', onError);

    try {
      socket.connect(port, ip);
    } catch {
      onError();
    }
  });
}