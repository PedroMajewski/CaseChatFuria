"use client"

import LiveGameStatusDisplay from '@/components/sections/live-game-status';
import NewsFeed from '@/components/news-feed';
import ChatInterface from '@/components/sections/chat-interface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Users, Bot } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

//Components
import LiveorCarousel from '@/components/sections/LiveorCarousel';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

//Serviços

export default function HomePage() {

  const { user, loading } = useAuth();
  const [username, setUserName] = useState("");
  const [name,setName] = useState("");
  const [stats,setStats] = useState(null)
  const [isLiveNow,setIsLiveNow] = useState(false);
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);

  //Função Simulada de Testes com LIVE
  useEffect(() => {
    const simulateLiveStatus = () => {
      const isLive = Math.random() > 0.5; 
      if (isLive) {
        // Simula que está passando uma live
        setIsLiveNow(true);
        setLiveVideoId("OWoG6XMiU8g"); 
      } else {
        // Simula que não tem live
        setLiveVideoId(null);
      }
    };

    simulateLiveStatus();
  }, []);

  useEffect(() => {

    const buscarNomeUsuario = async () => {
      if (!user?.email) return;

      try {
        const q = query(collection(db, "usuarios"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        const userData = doc.data();
        setUserName(userData.username);
        setName(userData.name);
        });
      } catch (err) {
        console.error("Erro ao buscar nome do usuário:", err);
      }
    };

    buscarNomeUsuario();
  }, [user]);

  if (loading){
    return <div className="text-center p-20">Carregando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">

      {/* Carousel e Live Section / Welcome */}
      <LiveorCarousel isLive={isLiveNow} liveId={liveVideoId || ""}/>
      

      {/* Hero Section / Welcome */}
      {isLiveNow ? (
        <LiveGameStatusDisplay/>
      ) : (
        
        <section className="text-center py-10 bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-lg shadow-inner">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary tracking-tight">Bem Vindo ao FURIA Fan Zone!</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sua central de informações da Furia em Primeira Mão!
          </p>
          {user && (
              <p className="text-2xl mt-5 font-normal max-w-2xl mx-auto">
              Agora você ta na casa! - <strong>{username}</strong>
            </p>
          )}
          {!user && (
          <div className="mt-6">
            <Link href={"/login"}>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Entre na Torcida! (Log In / Sign Up)
            </Button>
            </Link>
          </div>)}
        </section>
      )
        
      }


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Game Status and News */}
        <div className="lg:col-span-1 space-y-8">
           {/* Optional: Card for "Acompanhe jogos ao vivo" */}
           <Card className="shadow-md bg-card/80 backdrop-blur">
             <CardHeader>
               <CardTitle className="text-primary">Live Action</CardTitle>
               <CardDescription>Participe do chat em tempo real!</CardDescription>
             </CardHeader>
             <CardContent>
               <p className="mb-4 text-muted-foreground">Viva a experiência de conversar com quem também entende do assunto.</p>
               {/* Button linking to chat or a specific match page */}
               {user ? (
                <Button variant="default" className="w-full">Participe do Chat Match</Button>
              ) : (
                <Link href={"/login"}><Button variant="outline" className="w-full" disabled>Requer Login - Faça agora mesmo!</Button></Link>
              )}
             </CardContent>
           </Card>
           <LiveGameStatusDisplay/>
          <NewsFeed />

            

          {/* Placeholder for History/Polls */}
           <Card className="shadow-md bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle>More Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="secondary" className="w-full" disabled>View Match History</Button>
              <Button variant="secondary" className="w-full" disabled>Vote in Fan Polls</Button>
              <Button variant="secondary" className="w-full" disabled>Win Prizes!</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="general">
                 <Users className="h-4 w-4 mr-2" /> Chat Geral
              </TabsTrigger>
              <TabsTrigger value="simulated">
                 <Bot className="h-4 w-4 mr-2" /> Converse com o time
               </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <ChatInterface chatRoomId="GsEj1NelD1a669Oqby68"/>
            </TabsContent>
             <TabsContent value="simulated">
              <ChatInterface chatRoomId="simulated"/>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
