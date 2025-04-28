# **App Name**: Furia Fan Zone

## Core Features:

- Live Game Status: Display a real-time feed of match scores, player stats (K/D), and round wins. Data will be mocked for demonstration purposes, but the UI will be designed to accommodate a future HLTV API integration.
- Real-Time Chat: Enable real-time chat rooms for general discussion and live match commentary. Separate rooms for different purposes enhance user experience.
- News Feed: Show news and announcements related to the FURIA CS:GO team, including tournament updates, roster changes, and player statistics. Content can be manually updated via a simple CMS.

## Style Guidelines:

- Primary color: Black (#000000) for a bold and intense feel, reflecting FURIA's brand.
- Secondary color: Vivid Gold (#FFD700) to add a vibrant and energetic accent.
- Accent: White (#FFFFFF) for contrast and readability.
- Use a card-based layout to organize information clearly.
- Incorporate custom icons related to CS:GO and FURIA, such as weapon icons, map icons, and the FURIA logo.
- Subtle transitions and animations to enhance the user experience when navigating between sections or when new data loads.

## Original User Request:
Conceituação sobre Challenge 1 - Proposta de Chat:

- Proposta:

Challenge #1: Experiência Conversacional [NORMAL]
Objetivo: Desenvolver um caso de uso conversacional relacionado à FURIA (Telegram, web chat ou mobile chat)


Proposta: Crie um chat para os fãs do time de CS da FURIA. O Chat deve conter tudo que você, como fã, gostaria de ver para acompanhar e interagir com o time.


Outras Ideias Inspiradoras de Chat:
Simulador de conversa de torcida.
Live status de jogos com interações em tempo real.
Referência do Contato Inteligente (Whatsapp: https://wa.me/5511993404466) da FURIA, em closed beta.

- Ideia Base:

		🌟 Ideia Base: "FURIA Fan Chat Experience"
Uma aplicação web/mobile (tipo PWA) onde os fãs podem:

Acompanhar jogos em tempo real.

Conversar com outros fãs.

Receber alertas de partidas, jogadas incríveis ou vitórias.

Ver estatísticas dos jogadores ao vivo.

Simular bate-papo com jogadores ou a própria "Torcida FURIA".

💡 Como realizar:
1. Landing Page

Visual muito "FURIA" — preto, roxo, branco.

Botão grande de Entrar no Chat.

Cards ou seções com:

"Acompanhe jogos ao vivo" - Botão: "Participe da torcida" para entrar no Chat(Requer autenticação - criar conta)

"Histórico de Jogos" - dividir por mes e ano

Área de notícias e novidades: Atualizações sobre torneios, contratações, estatísticas dos jogadores e movimentações dentro do time.

Interação com a comunidade: Permita que os fãs votem em enquetes sobre melhores jogadas, expectativa para futuras partidas e até mesmo escolha de skins favoritas.



"Ganhe prêmios participando"

2. Chat
Mensagens em tempo real usando WebSocket (Ex: Firebase, Socket.IO).

Áreas de chat separadas:

Chat Geral (todos)

Chat da Partida (só quem está assistindo o jogo)

Chat Simulado (ex: simular bate-papo com o arT ou KSCERATO usando IA!)

3. Live Status de Jogos
Painel com:

Placar em tempo real.

K/D dos jogadores.

Rodadas vencidas.

"Clutchs", "Aces" destacados automaticamente no chat.

Pode puxar da API da HLTV ou criar um mock para demonstração.

4. Integração estilo "Contato Inteligente"
IA que entende perguntas tipo:

"Quando é o próximo jogo?"

"Quem é o top fragger hoje?"

"Mostre a tabela do campeonato."

Pode usar NLP simples (Dialogflow, wit.ai ou até um botzinho próprio).


🎯 Extras para brilhar:
1. Gamificação:
Pontos para quem participar do chat durante os jogos.

Rankings de fãs mais ativos.

Modo “Fan Challenges”: Desafios semanais(ou por jogo) com premiações, como skins, cupons para lojas parceiras ou acesso exclusivo a conteúdos.


2. Notificações Push:
"FURIA venceu! 🏆 Vamos comemorar!"

"O jogo começa em 15 minutos!"

3. Momentos Instantâneos:
Quando acontecer algo épico (tipo clutch insano), enviar:

GIFs automáticos.

Clips curtos (se possível).

Mensagem no chat tipo "🔥 Clutch do yuurih! 🔥".

4. Customização de Avatar:
Cada fã pode escolher avatares inspirados na FURIA.

5. Simulador de Torcida:
Mini-jogo de simulação: "Monte sua torcida perfeita", "Acerte o resultado da partida", etc.

Faça SEM IMPLEMENTAÇÃO DE AI por enquanto, pois estava com muitos conflitos
  