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
import QuickReactions from "@/components/QuickReactions"
import EventOverlay from '@/components/EventOverlay';

//Firebase
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import EventTrigger from '../EventTrigger';

interface Message {
  id: string;
  sender: string; 
  text: string;
  timestamp: number;
  avatar?: string;
}

interface ChatInterfaceProps {
  chatRoomId: 'GsEj1NelD1a669Oqby68' | 'mYeQg8DNSeuHthDTKKzd' | 'simulated';
}

const ChatInterface: FC<ChatInterfaceProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useAuth();
  const [eventTitle, setEventTitle] = useState<string | null>(null);;
  

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
      case 'mYeQg8DNSeuHthDTKKzd': return ['Chat da Partida','Comente aqui sobre o clutch!'];
      case 'simulated': return ['Fale com o Time','Dê a call para nossos players'];
      default: return 'Chat';
    }
  }

  return (
    <Card className="w-full h-[500px] flex flex-col shadow-lg bg-card/80 backdrop-blur md:h-[650px]">
      <EventOverlay chatRoomId={chatRoomId} onTitleUpdate={setEventTitle} />
      <CardHeader>
        <CardTitle className="text-primary">{getChatTitle()[0]}</CardTitle>
        <CardDescription className="text-secondary text-normal font-2xl">{getChatTitle()[1]}</CardDescription>
        {eventTitle && (
          <p className="text-sm text-accent animate-pulse">{eventTitle}</p>
        )}
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
                  key={message.id}
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    // Aplica o estilo dependendo se o remetente é o usuário logado ou não
                    message.sender === user?.displayName
                      ? 'bg-primary text-primary-foreground'  // Estilo para o usuário logado
                      : 'bg-primary text-primary-foreground'  // Estilo para outros remetentes ou visitantes
                  }
                  // Estilos específicos para palavras-chave
                  ${message.text.toLowerCase().includes('clutch') ? 'bg-rose-900 text-white border border-rose-500 font-bold' : ''}
                  ${message.text.toLowerCase().includes('1v1') ? 'bg-blue-200 text-black border border-blue-500 font-bold' : ''}
                  ${message.text.toLowerCase().includes('furia') ? 'bg-violet-700 text-white border border-violet-500 font-bold' : ''}
                  `}
                >
                  {/* Exibe o nome do remetente, caso não seja o usuário */}
                  {message.sender && message.sender !== user?.displayName && (
                    <p className="text-xs font-semibold mb-1 opacity-80">{message.sender}</p>
                  )}

                  <p className="text-sm">{message.text}</p>
                </div>

              
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
      

            {chatRoomId == "mYeQg8DNSeuHthDTKKzd" && (
              <div className='flex items-center gap-1'>
              <QuickReactions chatRoomId='mYeQg8DNSeuHthDTKKzd'/>
              </div>
            )}
              <Button className='mt-5 h-9 flex  items-center gap-2' onClick={handleSendMessage} size="icon" aria-label="Send message">
                <SendHorizonal className="h-5 w-full" />
              </Button>
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="Essa função equer Login - Faça agora mesmo jogador!"
                value={inputValue}
                className="flex-grow mt-5 text-center"
                aria-label="MensagemInput"
                disabled
              />
            </>
          )}
        </div>
      </CardFooter>
      {chatRoomId == "mYeQg8DNSeuHthDTKKzd" && (
              <EventTrigger chatRoomId={chatRoomId}/>
      )}
    </Card>
  );
};

export default ChatInterface;
