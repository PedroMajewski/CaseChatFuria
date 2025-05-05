
# FURIA CS FAN Zone - Documentação Técnica

Uma aplicação web moderna em tempo real desenvolvida para conectar os fãs de CS2 da FURIA. Ela oferece uma experiência totalmente interativa com chat ao vivo, acompanhamento de partidas em tempo real e muito mais — tudo pensado para fortalecer a comunidade FURIA.

## 📉 Visão Geral

FURIA CS Zone é uma aplicação full-stack composta por:

- Um frontend baseado em Next.js.
- Um backend baseado em Firebase.

A plataforma integra dados dinâmicos e estáticos(através de simulação de partidas reais junto com HLTV).

## 🎮 Funcionalidades Principais

### Acompanhamento de Partidas
- Placar em tempo real - Simulação
- Estatísticas em tempo real
- Acompanhamento de desempenho dos jogadores
- Destaques e replays das partidas

## 🎯 Público-Alvo do Projeto

- Fãs da equipe FURIA
- Entusiastas de CS:GO
- Apostadores e analistas de esports
- Membros da comunidade gamer
- Entusiastas de estatísticas esportivas

### Comunidade Engajada
- Sistema de chat em tempo real
- Perfis de usuários com personalização
- Funcionalidades de engajamento comunitário
- Previsões e discussões sobre partidas


## 🌟 Diferenciais

- Rastreamento e estatísticas de partidas em tempo real
- Integração com dados do HLTV para cobertura completa
- Conteúdo e discussões geradas pela comunidade
- Interface moderna e responsiva
- Autenticação e perfis seguros

## 🚀 Tecnologias Utilizadas

### Frontend

- **Framework:** Next.js 15.3.0
- **Linguagem:** TypeScript
- **Biblioteca de UI:** ShadCN
- **Estilização:** TailwindCss
- **Ícones:** Lucide React
- **Manipulação de Animações:** Motion Framer
- **Ferramentas de Desenvolvimento:** TypeScript, Node.js

### Backend

- **Runtime:** Google RealTime Firebase
- **Framework:** Express.js 4.18.2
- **Linguagem:** TypeScript
- **Integração de APIs:** HLTV API
- **Middlewares:** Auth Base Google, Métodos Autentication

### Autenticação

- Sistema de gerenciamento de credenciais com segurança - Google Auth

## 🚧 Instalação e Ambiente de Desenvolvimento

```bash
git clone https://github.com/PedroMajewski/CaseChatFuria.git
cd furia-zone
npm install
npm dev
```

**Requisitos:**
- Node.js ≥ 18
- npm
- Integração FIREBASE



### Gerenciamento de Usuários

```ts
POST /users
GET /users
POST /users/check-username
PUT /users/:id
```

### Sistema de Chat

```ts
POST /chat/messages
GET /chat/messages
```

### Sistema de Chat

```ts
POST /usuarios/messages
```

## 🌎 Boas Práticas e Melhorias Futuras

- Uso extensivo de TypeScript
- Arquitetura moderna e modular
- Integração com API Tempo Real HLTV
- Integração com API externa

## 👤 Diretrizes de Contribuição

- Faça um fork e clone o repositório.
- Crie uma branch para a feature.
- Abra um Pull Request com contexto detalhado.

## 📺 Licença

Este projeto está licenciado sob a licença **MIT**.
