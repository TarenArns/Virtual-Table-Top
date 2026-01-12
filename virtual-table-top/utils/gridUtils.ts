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
                newGrid.grid[r][c] = { id: items.length + count, position: { x: c, y: r }, type: 'empty', stats: null };
            }

        }
    }
    return newGrid;
}

export function swapPositions(grid: grid, toMove: gridItem, toReplace: gridItem): grid {
    const newGrid = grid
    const tempItem = newGrid.grid[toMove.position.y][toMove.position.x]
    const tempX = toMove.position.x
    const tempY = toMove.position.y
    newGrid.grid[toMove.position.y][toMove.position.x] = newGrid.grid[toReplace.position.y][toReplace.position.x]
    newGrid.grid[toReplace.position.y][toReplace.position.x] = tempItem
    toMove.position.y = toReplace.position.y
    toMove.position.x = toReplace.position.x
    toReplace.position.y = tempY
    toReplace.position.x = tempX
    return newGrid
}   