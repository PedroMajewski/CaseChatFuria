import LiveGameStatusDisplay from '@/components/live-game-status';
import NewsFeed from '@/components/news-feed';
import ChatInterface from '@/components/chat/chat-interface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare, Users, Bot } from 'lucide-react'; // Icons for tabs

export default function Home() {
  // Mock match ID, in a real app this might come from routing or state management
  const currentMatchId = "mock-match-123";

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">

      {/* Hero Section / Welcome */}
      <section className="text-center py-10 bg-gradient-to-r from-primary/10 via-background to-primary/10 rounded-lg shadow-inner">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary tracking-tight">Welcome to the Furia Fan Zone!</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your central hub for live games, news, and connecting with the FURIA community. VAMO!
        </p>
         {/* Placeholder Login/Signup - Replace with actual auth later */}
        <div className="mt-6">
           <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Join the Torcida! (Log In / Sign Up)
           </Button>
        </div>
      </section>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Live Game Status and News */}
        <div className="lg:col-span-1 space-y-8">
           {/* Optional: Card for "Acompanhe jogos ao vivo" */}
           <Card className="shadow-md bg-card/80 backdrop-blur">
             <CardHeader>
               <CardTitle className="text-primary">Live Action</CardTitle>
               <CardDescription>Join the chat during live matches!</CardDescription>
             </CardHeader>
             <CardContent>
               <p className="mb-4 text-muted-foreground">Experience the thrill of FURIA's matches in real-time with fellow fans.</p>
               {/* Button linking to chat or a specific match page */}
               <Button variant="outline" className="w-full" disabled>Participate in Match Chat (Requires Login)</Button>
             </CardContent>
           </Card>

          <LiveGameStatusDisplay matchId={currentMatchId} />
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
                 <Users className="h-4 w-4 mr-2" /> General
              </TabsTrigger>
              <TabsTrigger value="match">
                 <MessageSquare className="h-4 w-4 mr-2" /> Match Chat
              </TabsTrigger>
              <TabsTrigger value="simulated">
                 <Bot className="h-4 w-4 mr-2" /> Simulate
               </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <ChatInterface chatRoomId="general" />
            </TabsContent>
            <TabsContent value="match">
               {/* Display Match chat only if a game is theoretically live */}
               {/* You might add logic here based on liveGameStatus data */}
              <ChatInterface chatRoomId="match" />
              {/* Fallback if no live game */}
              {/* <Card><CardContent><p className="text-center p-8 text-muted-foreground">No live match chat currently active.</p></CardContent></Card> */}
            </TabsContent>
             <TabsContent value="simulated">
              <ChatInterface chatRoomId="simulated" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
