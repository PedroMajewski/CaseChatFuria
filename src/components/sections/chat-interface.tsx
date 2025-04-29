'use client';

import type { FC } from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: string; // 'user' or 'bot' or fan name
  text: string;
  timestamp: number;
  avatar?: string;
  isUser?: boolean;
}

interface ChatInterfaceProps {
  chatRoomId: 'general' | 'match' | 'simulated'; // Example room IDs
}

const ChatInterface: FC<ChatInterfaceProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [chatRoomId]);


  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'You',
      text: inputValue,
      timestamp: Date.now(),
      isUser: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simulate bot response for 'simulated' chat
    if (chatRoomId === 'simulated') {
      setTimeout(() => {
        const botResponse: Message = {
          id: `bot-${Date.now()}`,
          sender: 'arT Bot', // Or KSCERATO Bot, etc.
          text: `Responding to "${inputValue.substring(0, 20)}..." with some simulated AI logic! W key!`,
          timestamp: Date.now(),
          isUser: false,
           avatar: '/icons/art-avatar.png'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    } else {
       // Simulate other fans responding in general/match chat
       setTimeout(() => {
        const fanResponse: Message = {
          id: `fan-${Date.now()}`,
          sender: `RandomFan${Math.floor(Math.random() * 100)}`,
          text: `Yeah, I agree with "${inputValue.substring(0, 15)}..."!`,
          timestamp: Date.now(),
          isUser: false,
          avatar: `https://picsum.photos/seed/${Math.random()}/40/40`
        };
        setMessages(prev => [...prev, fanResponse]);
      }, 1500);
    }

  }, [inputValue, chatRoomId]);

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
      case 'general': return 'General Fan Chat';
      case 'match': return 'Live Match Discussion';
      case 'simulated': return 'Chat with arT Bot';
      default: return 'Chat';
    }
  }

  return (
    <Card className="w-full h-[600px] flex flex-col shadow-lg bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-primary">{getChatTitle()}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.isUser ? 'justify-end' : 'justify-start'
                }`}
              >
                {!message.isUser && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.avatar} alt={message.sender} />
                    <AvatarFallback>
                       {message.sender.startsWith('Moderator') || message.sender.endsWith('Bot') ? <Bot className="h-4 w-4" /> : message.sender[0]}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {!message.isUser && <p className="text-xs font-semibold mb-1 opacity-80">{message.sender}</p>}
                  <p className="text-sm">{message.text}</p>
                  {/* Optional: Timestamp display
                   <p className="text-xs opacity-50 mt-1 text-right">
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </p>
                   */}
                </div>
                 {message.isUser && (
                   <Avatar className="h-8 w-8">
                    {/* User avatar can be added here */}
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                 )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow"
            aria-label="Chat message input"
          />
          <Button onClick={handleSendMessage} size="icon" aria-label="Send message">
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
