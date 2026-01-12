

type gridItem = {
    id: number|undefined;
    position: { x: number; y: number; };
    player: playerCharacter;
};

type playerCharacter = {
    name: string;
    image: string | undefined;
}

type grid = {
    dimensions: { rows: number; columns: number; };
    grid: gridItem[][];
};