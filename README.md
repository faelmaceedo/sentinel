# 🛡️ SENTINEL v2.0

> **NOC Dashboard & Infrastructure Monitor** — Sistema de monitoramento tático em tempo real desenvolvido para visualização de ativos de rede, servidores e infraestrutura crítica.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-FFD700?style=for-the-badge&logo=lucide&logoColor=black)

## 🚀 Sobre o Projeto

O **Sentinel** é um dashboard de monitoramento de ativos que utiliza escaneamento híbrido (ICMP/TCP) para verificar a saúde de servidores, máquinas virtuais (VMs) e dispositivos IoT. Diferente de pings convencionais, ele armazena o histórico de latência para análise de tendências e uptime.

### 🎯 Funcionalidades Principais

* **Monitoramento em Tempo Real:** Status Live (Online/Offline) com atualização automática a cada 3 segundos.
* **Escaneamento Híbrido:** Motor de busca baseado em ICMP que atravessa firewalls comuns.
* **Analytics de Latência:** Gráficos dinâmicos mostrando a pulsação da rede.
* **Histórico de 24h:** Registro persistente no Supabase para análise de logs passados.
* **CRUD de Ativos:** Interface completa para adicionar, categorizar e remover dispositivos.
* **Segurança:** Middleware de proteção de rotas e autenticação robusta.
* **Notificações Táticas:** Feedback visual via Toasts (Sonner) para todas as ações do sistema.

## 🛠️ Stack Técnica

- **Frontend:** Next.js 14 (App Router), Tailwind CSS.
- **Backend:** Serverless Routes (Next.js), Supabase (PostgreSQL).
- **Monitoramento:** Engine baseada na biblioteca `ping` para Node.js.
- **Visualização:** Recharts para gráficos de latência.

## ⚙️ Instalação e Configuração

1. **Clone o repositório:**
   ```
   git clone [https://github.com/seu-usuario/seplan-sentinel.git](https://github.com/seu-usuario/seplan-sentinel.git)
Instale as dependências:

npm install
Configure as Variáveis de Ambiente (.env.local):

Snippet de código
NEXT_PUBLIC_SUPABASE_URL=seu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_supabase
ADMIN_USER=admin
ADMIN_PASS=sua_senha_segura

Inicie o Ambiente de Desenvolvimento:


npm run dev
🏗️ Estrutura de Pastas
Plaintext
├── app/
│   ├── api/scan/      # Engine de monitoramento (Backend)
│   ├── dashboard/     # Painel principal e sub-páginas
│   └── page.tsx       # Tela de Login blindada
├── components/        # UI Components (Cards, Gráficos, Modais)
├── lib/               # Configurações de API e Supabase
└── public/            # Ativos estáticos
Desenvolvido com foco em Alta Disponibilidade e Visualização Crítica.


---

### 🚀 2. O Script de Commit (Finalização)

Para enviar tudo para o GitHub agora com as versões refinadas:

1.  **Adicione os novos arquivos:**
    ```
    git add .
    ```

2.  **Commit Tático:**
    ```
    git commit -m "feat: implement analytics history, hybrid icmp scan and refined ux with toasts"
    ```

3.  **Push para o QG (GitHub):**
    ```
    git push origin main
    ```

---
