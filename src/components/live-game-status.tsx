'use client'; // Required for useEffect and useState

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import type { LiveGameStatus, PlayerStats } from '@/services/hltv'; // Import types
import { getLiveGameStatus } from '@/services/hltv'; // Import the service function
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Crosshair } from 'lucide-react'; // Icons for teams/stats

interface LiveGameStatusProps {
  matchId: string; // Pass matchId to fetch specific game data
}

const PlayerStatsTable: FC<{ players: PlayerStats[], teamName: string }> = ({ players, teamName }) => (
  <>
    <h4 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
      <Flame className="h-5 w-5 text-primary" /> {teamName} Players
    </h4>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">K/D</TableHead>
          <TableHead className="text-right">Rounds Won</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.name}>
            <TableCell className="font-medium">{player.name}</TableCell>
            <TableCell className="text-right">{player.kdRatio.toFixed(1)}</TableCell>
            <TableCell className="text-right">{player.roundsWon}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

const LiveGameStatusDisplay: FC<LiveGameStatusProps> = ({ matchId }) => {
  const [gameStatus, setGameStatus] = useState<LiveGameStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real scenario, matchId would be used here
        const status = await getLiveGameStatus(matchId);
        setGameStatus(status);
      } catch (err) {
        console.error("Failed to fetch live game status:", err);
        setError("Could not load live game status.");
        setGameStatus(null); // Reset status on error
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();

    // Optional: Set up polling or WebSocket connection for real-time updates
    // const intervalId = setInterval(fetchStatus, 15000); // Poll every 15 seconds
    // return () => clearInterval(intervalId); // Clean up interval

  }, [matchId]); // Re-fetch if matchId changes

  if (loading) {
    return (
      <Card className="w-full shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-10 w-1/4" />
          </div>
          <Separator className="my-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
           <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-6 w-1/2 mb-2" />
           <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full shadow-lg border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!gameStatus) {
    return (
       <Card className="w-full shadow-lg">
        <CardHeader>
          <CardTitle>No Live Game</CardTitle>
        </CardHeader>
        <CardContent>
          <p>There is no live game data available currently.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Crosshair className="h-6 w-6"/> Live Match: FURIA vs. Opponent
        </CardTitle>
         <p className="text-center text-muted-foreground">Map: {gameStatus.currentMap}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around items-center mb-6 text-4xl font-bold">
          <div className="text-center">
            <span className="text-primary">FURIA</span>
            <div className="mt-1">{gameStatus.teamAScore}</div>
          </div>
          <span className="text-muted-foreground text-3xl">vs</span>
           <div className="text-center">
            <span>Opponent</span>
            <div className="mt-1">{gameStatus.teamBScore}</div>
          </div>
        </div>

        <Separator className="my-6 border-border/50" />

        <div>
           <PlayerStatsTable players={gameStatus.teamAPlayerStats} teamName="FURIA" />
           <PlayerStatsTable players={gameStatus.teamBPlayerStats} teamName="Opponent" />
        </div>

        {/* Placeholder for events like clutches, aces */}
         <div className="mt-6 p-3 bg-secondary rounded-md">
          <p className="text-sm text-secondary-foreground text-center">🔥 Clutch by yuurih! 🔥 (Mock Event)</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveGameStatusDisplay;
