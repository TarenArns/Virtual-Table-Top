

type gridItem = {
    id: number|undefined;
    position: { x: number; y: number; };
    content: string | undefined;
};

type grid = {
    dimensions: { rows: number; columns: number; };
    grid: gridItem[][];
};