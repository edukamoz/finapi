# FinAPI - API Financeira

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="NodeJS" src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="PostgreSQL" src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img alt="Docker" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

## 💻 Sobre o projeto

A **FinAPI** é uma aplicação backend para controle financeiro pessoal. O sistema permite criar contas, realizar depósitos e saques, com validação de saldo em tempo real e autenticação JWT.

O foco principal deste projeto foi a aplicação de **Clean Architecture**, **SOLID** e **Programação Defensiva**.

## 🛠 Tecnologias

- **Node.js** com **TypeScript**
- **Express** (Framework Web)
- **Prisma ORM** (Database & Migrations)
- **PostgreSQL** (Banco de dados no Docker)
- **JWT** (Autenticação) & **Bcrypt** (Criptografia)
- **Docker Compose** (Containerização)

## 🚀 Como Executar

### Pré-requisitos

- Node.js
- Docker & Docker Compose

### Instalação

```bash
# Clone o repositório
git clone [https://github.com/SEU_USUARIO/finapi.git](https://github.com/SEU_USUARIO/finapi.git)

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# (Preencha o .env com seus dados locais)

# Suba o Banco de Dados
docker compose up -d

# Rode as migrations
npx prisma migrate dev

# Inicie o servidor
npm run dev
```

### 📍 Rotas da API

```
POST /users: Criar usuário
```

```
POST /sessions: Autenticação (Login)
```

```
POST /statements/deposit: Realizar depósito (Requer Token)
```

```
POST /statements/withdraw: Realizar saque (Requer Token)
```
