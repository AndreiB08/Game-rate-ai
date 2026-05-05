import { useEffect, useState } from "react";
import { getGames } from "../services/gameApi";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  return (
    <div>
      <h1>Free Games 🎮</h1>

      {games.map((game) => (
        <div key={game.id}>
          <h3>{game.title}</h3>
          <img src={game.thumbnail} width="200" />
          <p>{game.short_description}</p>
        </div>
      ))}
    </div>
  );
}