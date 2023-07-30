import LmaoGame from "../../components/LmaoGame";
import { GameProvider } from "../../contexts/game";

export default function Lmao() {
  return (
    <GameProvider>
      <LmaoGame />
    </GameProvider>
  );
}
