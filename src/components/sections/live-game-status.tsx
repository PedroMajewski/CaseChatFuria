'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Crosshair, CircleIcon } from 'lucide-react';
import getMatchStats from '@/api/jogoaovivo';

interface PlayerStats {
  name: string;
  kills: number;
  deaths: number;
  adr: number;
  rating: number;
}

interface MatchStats {
  team1: {
    name: string;
    players: PlayerStats[];
  };
  team2: {
    name: string;
    players: PlayerStats[];
  };
  result: {
    team1MapsWon: number;
    team2MapsWon: number;
  };
  event: {
    name: string;
  };
}

const PlayerStatsTable: FC<{ players: PlayerStats[]; teamName: string }> = ({ players, teamName }) => (
  <>
    <h4 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
      <Flame className="h-5 w-5 text-primary" /> {teamName} Jogadores
    </h4>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Eliminações</TableHead>
          <TableHead className="text-right">Mortes</TableHead>
          <TableHead className="text-right">ADR</TableHead>
          <TableHead className="text-right">Taxa de Acerto</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((player) => (
          <TableRow key={player.name}>
            <TableCell>{player.name}</TableCell>
            <TableCell className="text-right">{player.kills}</TableCell>
            <TableCell className="text-right">{player.deaths}</TableCell>
            <TableCell className="text-right">{player.adr}</TableCell>
            <TableCell className="text-right">{player.rating}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

const LiveGameStatusDisplay: FC = () => {
  const [matchData, setMatchData] = useState<MatchStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = () => {
      const data = getMatchStats();
      setMatchData(data);
      setLoading(false);
    };

    setTimeout(loadData, 500);
  }, []);

  if (loading) {
    return (
      <Card className="w-full shadow-lg">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full mb-4" />
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
          <CardTitle className="text-destructive">Erro</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!matchData) {
    return null;
  }

  return (
    <Card className="w-full shadow-lg bg-card/80 backdrop-blur">
      <CardHeader>
        <div className='flex flex-row align-center text-center justify-center w-full '>
          <h2 className='font-bold text-3xl'>AO VIVO</h2>
        </div>
        <CardTitle className="text-center text-2xl font-bold text-primary flex items-center justify-center gap-2">
          <Crosshair className="h-6 w-6" /> {matchData.team1.name} vs {matchData.team2.name}
        </CardTitle>
        <p className="text-center text-muted-foreground">{matchData.event.name}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around items-center mb-6 text-4xl font-bold">
          <div className="text-center">
            <span className="text-primary">{matchData.team1.name}</span>
            <div className="mt-1">{matchData.result.team1MapsWon}</div>
          </div>
          <span className="text-muted-foreground text-3xl">vs</span>
          <div className="text-center">
            <span>{matchData.team2.name}</span>
            <div className="mt-1">{matchData.result.team2MapsWon}</div>
          </div>
        </div>

        <Separator className="my-6 border-border/50" />

        <div>
          <PlayerStatsTable players={matchData.team1.players} teamName={matchData.team1.name} />
          <PlayerStatsTable players={matchData.team2.players} teamName={matchData.team2.name} />
        </div>

      </CardContent>
    </Card>
  );
};

export default LiveGameStatusDisplay;
