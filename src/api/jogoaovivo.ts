// src/api/matchData.ts

const getMatchStats = () => {
    return {
      matchId: 20250201,
      date: 1733113500000,
      result: {
        team1MapsWon: 0,
        team2MapsWon: 2,
      },
      team1: {
        id: 4608,
        name: "FURIA",
        players: [
          { name: "KSCERATO", kills: 25, deaths: 25, adr: 84.7, rating: 0.94 },
          { name: "skullz", kills: 13, deaths: 24, adr: 59.9, rating: 0.61 },
          { name: "yuurih", kills: 13, deaths: 29, adr: 53.6, rating: 0.52 },
          { name: "FalleN", kills: 13, deaths: 28, adr: 37.8, rating: 0.46 },
          { name: "chelo", kills: 10, deaths: 30, adr: 42.8, rating: 0.40 },
        ],
      },
      team2: {
        id: 4411,
        name: "Natus Vincere",
        players: [
          { name: "b1t", kills: 38, deaths: 17, adr: 121.0, rating: 1.93 },
          { name: "iM", kills: 31, deaths: 17, adr: 102.6, rating: 1.67 },
          { name: "w0nderful", kills: 30, deaths: 16, adr: 90.4, rating: 1.52 },
          { name: "jL", kills: 24, deaths: 14, adr: 64.6, rating: 1.34 },
          { name: "Aleksib", kills: 13, deaths: 14, adr: 45.3, rating: 1.08 },
        ],
      },
      event: {
        id: 2025,
        name: "IEM Katowice 2025",
      },
    };
  };
  
  export default getMatchStats;
  