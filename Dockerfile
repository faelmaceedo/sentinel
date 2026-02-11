# Estágio 1: Instalação e Build
FROM node:20-alpine AS builder
WORKDIR /app

# Instalar dependências necessárias para o comando ping no Alpine
RUN apk add --no-cache iputils

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio 2: Runner (Produção)
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache iputils
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]