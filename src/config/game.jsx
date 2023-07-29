export const GAME_WIDTH = 800;
export const CARD_WIDTH = 200;
export const CARD_HEIGHT = 150;

export const POISION_DAMAGE = 1;
export const POISON_DURATION = 3;

export const FIRE_DAMAGE = 2;
export const FIRE_DURATION = 2;

export const CHARACTER_CONFIGS = {
  knight: {
    displayName: "Knight",
    name: "knight",
    group: "player",
    maxHealth: 15,
    inventory: ["iron_sword", "iron_helmet", null, null, null],
  },
};

export const ITEM_CONFIGS = {
  iron_sword: {
    displayName: "Iron Sword",
    name: "iron_sword",
    group: "weapon",
    subgroup: "sword",
    damage: 5,
  },
  iron_helmet: {
    displayName: "Iron Helmet",
    name: "iron_helmet",
    group: "armor",
    subgroup: "helmet",
    defense: 5,
  },
};
