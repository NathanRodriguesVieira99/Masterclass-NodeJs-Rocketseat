# Masterclass Node.js Rocketseat

Este projeto é uma aplicação Node.js desenvolvida durante a masterclass da Rocketseat. Ele utiliza Fastify, Drizzle ORM, PostgreSQL e outras tecnologias modernas para criar uma API robusta e escalável.

## Tecnologias Utilizadas
- Node.js
- Fastify
- Drizzle ORM
- PostgreSQL
- Docker
- TypeScript

## Como executar o projeto

### Pré-requisitos
- Node.js (v18+)
- Docker e Docker Compose
- pnpm(ou npm/yarn)

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/NathanRodriguesVieira99/Masterclass-NodeJs-Rocketseat.git
   cd Masterclass-NodeJs-Rocketseat
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o banco de dados com Docker:
   ```bash
    pnpm docker:up
   ```
4. Configure o arquivo `.env` conforme exemplo:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
   ```
5. Execute as migrações:
   ```bash
   pnpm db:migrate
   ```
6. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## Scripts Disponíveis
```
pnpm dev         # Inicia o servidor em modo desenvolvimento
pnpm docker:up   # Sobe o banco de dados com Docker Compose
pnpm db:generate # Gera os arquivos de migração do Drizzle
pnpm db:migrate  # Executa as migrações do banco de dados
pnpm db:studio   # Abre o Drizzle Studio para visualizar o banco
```

## Documentação
Acesse a documentação da API em: [http://localhost:3333/docs](http://localhost:3333/docs)

## Licença
Este projeto é apenas para fins educacionais.
