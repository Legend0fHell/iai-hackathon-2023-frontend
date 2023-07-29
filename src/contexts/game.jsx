import {
  createContext,
  use,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CHARACTER_CONFIGS, ITEM_CONFIGS } from "../config/game";
import uuid from "../utils/uuid";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [character, setCharacter] = useState(CHARACTER_CONFIGS.knight);
  const [gem, setGem] = useState(24);
  const [score, setScore] = useState(102);
  const [inventory, setInventory] = useState(
    character.inventory.map((item) => ITEM_CONFIGS[item])
  );
  const [health, setHealth] = useState(character.maxHealth);
  const [cards, setCards] = useState({});
  const [fire, setFire] = useState(1);
  const [poison, setPoison] = useState(1);
  const [board, setBoard] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const addGem = useCallback((amount) => setGem((gem) => gem + amount), []);

  const addScore = useCallback(
    (amount) => setScore((score) => score + amount),
    []
  );

  const addHealth = useCallback(
    (amount) =>
      setHealth((health) => Math.min(health + amount, character.maxHealth)),
    []
  );

  const reduceHealth = useCallback(
    (amount) => setHealth((health) => Math.min(health - amount, 1)),
    []
  );

  const generateCard = useCallback((x, y, isPlayer = false) => {
    const card = {
      id: uuid(),
      x,
      y,
    };

    setCards((cards) => ({
      ...cards,
      [card.id]: card,
    }));

    setBoard((board) => {
      const newBoard = [...board];
      newBoard[x + y * 3] = card.id;
      return newBoard;
    });
  }, []);

  const nguongMauTu = useMemo(() => health == 1, [health]);

  const armor = useMemo(() => {
    const armors = inventory.filter((item) => item && item.group == "armor");
    return armors.reduce((total, item) => total + item.defense, 0);
  }, [inventory]);

  useEffect(() => {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        generateCard(x, y, x == 1 && y == 1);
      }
    }
  }, [generateCard]);

  return (
    <GameContext.Provider
      value={{
        health,
        armor,
        addHealth,
        reduceHealth,
        nguongMauTu,
        character,
        gem,
        addGem,
        score,
        addScore,
        inventory,
        cards,
        fire,
        poison,
        board,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
