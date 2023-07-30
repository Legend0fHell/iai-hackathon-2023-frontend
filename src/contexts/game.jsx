import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CHARACTER_CONFIGS, ITEM_CONFIGS, MOB_CONFIGS } from "../config/game";
import uuid from "../utils/uuid";
import { getRandomValue } from "../utils/random";

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
  const [selectedSlotId, setSelectedSlotId] = useState(null);

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

    if (isPlayer) {
      card.type = "player";
      card.character = character;
    } else {
      card.type = "mob";
      card.mob = getRandomValue(MOB_CONFIGS);
      card.mob.health = card.mob.maxHealth;
      // card.mob.death = true;
    }

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

  const armor = useMemo(() => {
    const armors = inventory.filter((item) => item && item.group == "armor");
    return armors.reduce((total, item) => total + item.defense, 0);
  }, [inventory]);

  const weapon = useMemo(() => {
    const currentItem = inventory[selectedSlotId];

    if (currentItem && currentItem.group == "weapon") {
      return currentItem;
    }
    return null;
  }, [inventory, selectedSlotId]);

  const moveCard = useCallback(
    (cardId, dx, dy) => {
      setBoard((board) => {
        const card = cards[cardId];

        const newBoard = [...board];
        newBoard[card.x + card.y * 3] = null;
        newBoard[card.x + dx + (card.y + dy) * 3] = card.id;

        return newBoard;
      });

      setCards((cards) => {
        const card = cards[cardId];

        return {
          ...cards,
          [cardId]: {
            ...card,
            x: card.x + dx,
            y: card.y + dy,
          },
        };
      });
    },
    [setCards, setBoard, cards]
  );

  const onFinished = useCallback(() => {
    console.log("Call this function after user answered a question");
  }, []);

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
        moveCard,
        selectedSlotId,
        setSelectedSlotId,
        weapon,
        onFinished,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
