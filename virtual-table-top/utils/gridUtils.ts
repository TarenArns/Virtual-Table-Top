


export function buildGrid(items: gridItem[], dimensions: { rows: number; columns: number; }) {
    const newGrid: grid = {
        dimensions: dimensions,
        grid: [[]],
    }
    let count = 0
    for (let r = 0; r < newGrid.dimensions.rows; r++) {
        newGrid.grid[r] = [];
        for (let c = 0; c < newGrid.dimensions.columns; c++) {
            count++
            const item = (items.find(i => i.position.x === c && i.position.y === r))
            if (item) {
                newGrid.grid[r][c] = item;
            } else {
                newGrid.grid[r][c] = { id: items.length + count, position: { x: c, y: r }, content: undefined };
            }

        }
    }
    return newGrid;
}
