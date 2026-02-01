type grid = {
    dimensions: { rows: number; columns: number; };
    grid: gridItem[][];
    backgroundImage: string | undefined;
};

type gridItem = {
    id: number | undefined;
    position: { x: number; y: number; };
    type: 'player' | 'npc' | 'empty';
    stats: playerCharacter | npcCharacter | null;
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
    armourClass: number;
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
    armourClass: number;
    image: string | undefined;
}

type gridMode =
    | "idle"
    | "moving"
    | "addingPlayer"
    | "addingNPC"
    | "removing";

type gridAction =
    | { type: "ADD_PLAYER"; formData: FormData; x: number; y: number }
    | { type: "ADD_NPC"; formData: FormData; x: number; y: number }
    | { type: "MOVE_ITEM"; from: gridItem; to: gridItem }
    | { type: "REMOVE_ITEM"; x: number; y: number };


export type { grid, gridItem, playerCharacter, npcCharacter, gridMode, gridAction };
