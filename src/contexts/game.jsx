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
import shuffle from "lodash/shuffle";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [character, setCharacter] = useState(CHARACTER_CONFIGS.knight);
  const [gem, setGem] = useState(24);
  const [score, setScore] = useState(102);
  const [movable, setMovable] = useState(true);
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
  const [selectedSlotId, setSelectedSlotId] = useState(0);

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

  const tryToMove = useCallback(
    (x, y) => {
      if (!movable) {
        return;
      }

      const playerCard = Object.values(cards).find(
        (card) => card.type == "player"
      );

      if (Math.abs(playerCard.x - x) + Math.abs(playerCard.y - y) != 1) {
        return;
      }

      const targetCard = cards[board[x + y * 3]];
      const cards_ = { ...cards };
      const board_ = [...board];

      let tx = x;
      let ty = y;

      board_[x + y * 3] = playerCard.id;
      board_[playerCard.x + playerCard.y * 3] = null;

      delete cards_[targetCard.id];
      cards_[playerCard.id] = {
        ...playerCard,
        x,
        y,
      };

      let flag = true;

      // Shuffle cards
      const cardList = shuffle(Object.values(cards_));
      const movedCards = new Set();

      while (flag) {
        flag = false;

        cardList.forEach((card) => {
          if (movedCards.has(card.id)) {
            return;
          }

          const cx = card.x;
          const cy = card.y;

          if (card.type == "player") {
            return;
          }

          let dx = tx - cx > 0 ? 1 : tx - cx < 0 ? -1 : 0;
          let dy = ty - cy > 0 ? 1 : ty - cy < 0 ? -1 : 0;

          if (board_[cy * 3 + cx + dx] != null) dx = 0;
          if (board_[(cy + dy) * 3 + cx] != null) dy = 0;

          // Choose random direction if both are available
          if (Math.abs(dx) == 1 && Math.abs(dy) == 1) {
            if (Math.random() < 0.5) {
              dx = 0;
            } else {
              dy = 0;
            }
          }

          if (dx != 0 || dy != 0) {
            const nx = cx + dx;
            const ny = cy + dy;

            board_[ny * 3 + nx] = card.id;
            board_[cy * 3 + cx] = null;
            cards_[card.id].x = nx;
            cards_[card.id].y = ny;

            movedCards.add(card.id);

            flag = true;
          }
        });
      }

      setBoard(board_);
      setCards(cards_);
      setMovable(false);

      // find empty coord
      let emptyX = null;
      let emptyY = null;
      board_.forEach((cardId, index) => {
        if (cardId == null) {
          emptyX = index % 3;
          emptyY = Math.floor(index / 3);
        }
      });

      setTimeout(() => {
        generateCard(emptyX, emptyY);

        setTimeout(() => {
          setMovable(true);
        }, 200);
      }, 450);
    },
    [board, cards, movable]
  );

  const generateCard = useCallback((x, y, isPlayer = false) => {
    const card = {
      id: uuid(),
      x,
      y,
    };

    if (isPlayer) {
      card.type = "player";
      card.data = character;
    } else {
      card.type = ["mob", "item"][Math.floor(Math.random() * 2)];

      if (card.type == "mob") {
        card.data = getRandomValue(MOB_CONFIGS);
        card.data.health = card.data.maxHealth;
      } else {
        card.type = "item";
        card.data = getRandomValue(ITEM_CONFIGS);
      }
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
        tryToMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
