import type { grid, gridItem, playerCharacter } from "@/types/gridTypes";


export function buildGrid(items: gridItem[], dimensions: { rows: number; columns: number; }, image: string | undefined): grid {
    const newGrid: grid = {
        dimensions: dimensions,
        grid: [[]],
        backgroundImage: image
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

export function addPlayerToGrid(formData: FormData, grid: grid, xPos: number, yPos: number): grid {
    const name = formData.get('player-name') as string;
    const strength = Number(formData.get('player-strength'));
    const dexterity = Number(formData.get('player-dexterity'));
    const constitution = Number(formData.get('player-constitution'));
    const intelligence = Number(formData.get('player-intelligence'));
    const wisdom = Number(formData.get('player-wisdom'));
    const charisma = Number(formData.get('player-charisma'));
    const movementSpeed = Number(formData.get('player-movement-speed'));
    const armourClass = Number(formData.get('player-armour-class'));

    const player: playerCharacter = {
        name: name,
        strength: strength,
        dexterity: dexterity,
        constitution: constitution,
        wisdom: wisdom, 
        intelligence: intelligence, 
        charisma: charisma, 
        movementSpeed: movementSpeed, 
        armourClass: armourClass, 
        image: undefined
    }

    const newGrid = grid;

    const newItem: gridItem = {
        id: 100000,
        position: { x: xPos, y: yPos },
        type: 'player',
        stats: player
    }

    newGrid.grid[yPos][xPos] = newItem;

    return newGrid;

}

export function addNPCToGrid(targetCell: gridItem, grid: grid): grid {
    return grid;

}

export function removeItemFromGrid(targetCell: gridItem, grid: grid): grid {
    return grid;
}