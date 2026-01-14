type grid = {
    dimensions: { rows: number; columns: number; };
    grid: gridItem[][];
    backgroundImage: string | undefined;
};

type gridItem = {
    id: number | undefined;
    position: { x: number; y: number; };
    type: 'player' | 'npc' | 'empty';
    stats: playerCharacter | null;
};

type playerCharacter = {
    name: string;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    movementSpeed: number;
    image: string | undefined;
}

type npcCharacter = {
    name: string;
    challengeRating: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    movementSpeed: number;
    image: string | undefined;
}

export type { grid, gridItem, playerCharacter, npcCharacter };
