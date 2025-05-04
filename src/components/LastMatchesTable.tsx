"use client";

import React, { useEffect, useState } from "react";

interface Match {
  id: number;
  adversario: string;
  resultado: string;
  evento: string;
  data: string;
  link: string;
}

const LastMatchesTable = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5001/furiachatdatabase/us-central1/hltvfuria/ultimos-jogos");
        const data = await res.json();
        setMatches(data.jogos);
      } catch (err) {
        console.error("Erro ao buscar partidas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p className="font-bold ">Carregando últimas partidas...</p>;

  return (
    <>
    <h2 className="font-bold text-2xl text-center">Confira as Ultimas Partidas!</h2>
    <div className="overflow-x-auto rounded-lg border shadow-md mt-6 bg-gray-500">
      <table className="min-w-full bg-background text-sm">
        <thead className="bg-muted text-foreground uppercase text-xs">
          <tr>
            <th className="p-3 text-left">Data</th>
            <th className="p-3 text-left">Evento</th>
            <th className="p-3 text-left">Adversário</th>
            <th className="p-3 text-left">Resultado</th>
            <th className="p-3 text-left">Link</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id} className="border-t hover:bg-muted/20 transition">
              <td className="p-3">{match.data}</td>
              <td className="p-3"><strong>{match.evento}</strong></td>
              <td className="p-3">{match.adversario}</td>
              <td className={`p-3 font-semibold ${match.resultado.startsWith("FURIA") || match.resultado.includes("FURIA") ? "text-green-500" : "text-red-500"}`}>
                {match.resultado}
              </td>
              <td className="p-3">
                <a href={match.link} target="_blank" className="text-blue-500 hover:underline">
                  Ver jogo
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default LastMatchesTable;
