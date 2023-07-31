export const GAME_WIDTH = 800;
export const CARD_WIDTH = 150;
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
    inventory: ["iron_sword", null, null, null, null],
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
};

export const ITEM_CONFIGS = {
  wooden_sword: {
    displayName: "Sword",
    name: "wooden_sword",
    group: "weapon",
    subgroup: "sword",
    damage: 1,
    duribility: 2,
    spritesheet: {
      width: 12,
      height: 24,
      scale: 0.45,
    },
  },
  iron_sword: {
    displayName: "Sword",
    name: "iron_sword",
    group: "weapon",
    subgroup: "sword",
    damage: 2,
    duribility: 3,
    spritesheet: {
      width: 12,
      height: 24,
      scale: 0.45,
    },
  },
  golden_sword: {
    displayName: "Sword",
    name: "golden_sword",
    group: "weapon",
    subgroup: "sword",
    damage: 5,
    duribility: 1,
    spritesheet: {
      width: 12,
      height: 24,
      scale: 0.45,
    },
  },
  orange_mushroom: {
    displayName: "Mushroom",
    name: "orange_mushroom",
    group: "food",
    subgroup: "mushroom",
    spritesheet: {
      width: 16,
      height: 16,
      sclae: 0.75,
    },
  },
  brown_mushroom: {
    displayName: "Mushroom",
    name: "brown_mushroom",
    group: "food",
    subgroup: "mushroom",
    health: 3,
    spritesheet: {
      width: 16,
      height: 16,
    },
  },
  campfire: {
    displayName: "Campfire",
    name: "campfire",
    group: "campfire",
    spritesheet: {
      idle: [0, 2],
      width: 16,
      height: 16,
      scale: 0.8,
    },
  },
};

export const MOB_CONFIGS = {
  skeleton: {
    displayName: "Skeleton",
    name: "skeleton",
    group: "monster",
    maxHealth: 1,
    damage: 1,
    reward: 1,
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
  orc: {
    displayName: "Orc",
    name: "orc",
    group: "monster",
    maxHealth: 2,
    damage: 3,
    reward: 2,
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
  demon: {
    displayName: "Demon",
    name: "demon",
    group: "monster",
    maxHealth: 2,
    damage: 5,
    reward: 3,
    spritesheet: {
      idle: [0, 3],
      width: 24,
      height: 24,
    },
  },
};
