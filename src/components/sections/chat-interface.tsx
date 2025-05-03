'use client';

import type { FC } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal, Bot, User } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

//Firebase
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

interface Message {
  id: string;
  sender: string; 
  text: string;
  timestamp: number;
  avatar?: string;
}

interface ChatInterfaceProps {
  chatRoomId: 'GsEj1NelD1a669Oqby68' | 'match' | 'simulated'; // Example room IDs
}

const ChatInterface: FC<ChatInterfaceProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  

  useEffect(() => {
    if(!chatRoomId) return;
    
    const messagesRef = collection(db, 'chat', chatRoomId, 'mensagens');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs: Message[] = snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      sender: data.sender,
      text: data.text,
      timestamp: data.timestamp?.toMillis?.() || 0,
      avatar: data.avatar || '',
      isUser: data.isUser || false,
    };
  });
  setMessages(msgs);
});

    return () => unsubscribe();

    {/*
    let initialMessages: Message[] = [];
    if (chatRoomId === 'general') {
      initialMessages = [
        { id: 'g1', sender: 'FuriaFan99', text: 'VAMO FURIA!', timestamp: Date.now() - 10000, avatar: 'https://picsum.photos/seed/furia1/40/40' },
        { id: 'g2', sender: 'CSGO_Pro', text: 'Good luck in the next match!', timestamp: Date.now() - 5000, avatar: 'https://picsum.photos/seed/furia2/40/40' },
      ];
    } else if (chatRoomId === 'match') {
      initialMessages = [
        { id: 'm1', sender: 'ModeratorBot', text: 'Welcome to the live match chat! Be respectful.', timestamp: Date.now() - 15000, isUser: false, avatar: '/icons/bot-avatar.png' }, // Use Bot icon if no avatar
        { id: 'm2', sender: 'LiveCommentator', text: 'What an insane clutch from yuurih!', timestamp: Date.now() - 8000, avatar: 'https://picsum.photos/seed/commentator/40/40' },
      ];
    } else if (chatRoomId === 'simulated') {
       initialMessages = [
        { id: 's1', sender: 'arT Bot', text: 'Hey! Ready to talk strats? Or just W key?', timestamp: Date.now() - 5000, isUser: false, avatar: '/icons/art-avatar.png' }, // Specific bot avatar
      ];
    }
     // Add a default user message for context
    initialMessages.push({ id: 'u0', sender: 'You', text: 'Hey everyone!', timestamp: Date.now() - 2000, isUser: true });
    setMessages(initialMessages);
    */}
  }, [chatRoomId]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  
  const handleSendMessage = useCallback(async () => {
    if (inputValue.trim() === '') return;
  
    const messagesRef = collection(db, 'chat', chatRoomId, 'mensagens');
  
    await addDoc(messagesRef, {
      sender: user?.displayName || 'Anônimo',
      text: inputValue,
      timestamp: serverTimestamp(),
      avatar: user?.photoURL || '',
    });
  
    setInputValue('');
  }, [inputValue, chatRoomId, user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getChatTitle = () => {
    switch (chatRoomId) {
      case 'GsEj1NelD1a669Oqby68': return ['Chat Geral','Aqui a chama da FURIA não se apaga'];
      case 'match': return ['Chat da Partida','Comente aqui sobre o clutch!'];
      case 'simulated': return ['Fale com o Time','Dê a call para nossos players'];
      default: return 'Chat';
    }
  }

  return (
    <Card className="w-full h-[600px] flex flex-col shadow-lg bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-primary">{getChatTitle()[0]}</CardTitle>
        <CardDescription className="text-secondary text-normal font-2xl">{getChatTitle()[1]}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-4 overflow-auto" ref={scrollAreaRef}>
          <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${message.sender === user?.displayName ? 'justify-end' : 'justify-start'}`}
            >
              {/* Se não for mensagem do usuário atual, exibe o avatar do bot ou outro usuário */}
              {message.sender !== user?.displayName && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>
                    {message.sender.startsWith('Moderator') || message.sender.endsWith('Bot') ? (
                      <Bot className="h-4 w-4" />
                    ) : (
                      message.sender[0]
                    )}
                  </AvatarFallback>
                </Avatar>
              )}

              {/* Exibe a mensagem */}
              <div
                className={`max-w-[70%] rounded-lg px-3 py-2 ${
                  message.sender === user?.displayName
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {/* Exibe o nome do remetente, caso não seja o usuário */}
                {message.sender !== user?.displayName && (
                  <p className="text-xs font-semibold mb-1 opacity-80">{message.sender}</p>
                )}
                <p className="text-sm">{message.text}</p>
              </div>

              {/* Exibe o avatar do usuário, se for ele quem enviou a mensagem */}
              {message.sender === user?.displayName && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          </div>
        </ScrollArea>
      </CardContent>


      <CardFooter className="p()-4 border-t">
        <div className="flex w-full items-center gap-2">
          {user ? (
            <>
              <Input
                type="text"
                placeholder="Digite sua mensagem..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-grow mt-5"
                aria-label="MensagemInput"
              />
              <Button className='mt-5 h-9' onClick={handleSendMessage} size="icon" aria-label="Send message">
                <SendHorizonal className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Você tem que realizar o login para usar essas funcionaldiades - Realize acima guerreiro!"
                value={inputValue}
                className="flex-grow mt-5 text-center"
                aria-label="MensagemInput"
                disabled
              />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
