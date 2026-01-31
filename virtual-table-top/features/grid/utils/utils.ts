import type { grid, gridAction, gridItem, npcCharacter, playerCharacter } from "@/features/grid/types/types";


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
    const newGrid = {
        ...grid,
        grid: grid.grid.map(row => [...row])
    }
    
    const movedItem = { ...toMove, position: { x: toReplace.position.x, y: toReplace.position.y } }
    const replacedItem = { ...toReplace, position: { x: toMove.position.x, y: toMove.position.y } }
    
    newGrid.grid[toMove.position.y][toMove.position.x] = replacedItem
    newGrid.grid[toReplace.position.y][toReplace.position.x] = movedItem
    
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
        id: grid.grid[yPos][xPos].id,
        position: { x: xPos, y: yPos },
        type: 'player',
        stats: player
    }

    newGrid.grid[yPos][xPos] = newItem;

    return newGrid;

}

export function addNPCToGrid(formData: FormData, grid: grid, xPos: number, yPos: number): grid {
    const name = formData.get('npc-name') as string;
    const challengeRating = Number(formData.get('npc-challenge-rating'));
    const strength = Number(formData.get('npc-strength'));
    const dexterity = Number(formData.get('npc-dexterity'));
    const constitution = Number(formData.get('npc-constitution'));
    const intelligence = Number(formData.get('npc-intelligence'));
    const wisdom = Number(formData.get('npc-wisdom'));
    const charisma = Number(formData.get('npc-charisma'));
    const movementSpeed = Number(formData.get('npc-movement-speed'));
    const armourClass = Number(formData.get('npc-armour-class'));

    const npc: npcCharacter = {
        name: name,
        challengeRating: challengeRating,
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
        id: grid.grid[yPos][xPos].id,
        position: { x: xPos, y: yPos },
        type: 'npc',
        stats: npc
    }

    newGrid.grid[yPos][xPos] = newItem;

    return newGrid;

}

export function removeItemFromGrid(grid: grid, xPos: number, yPos: number): grid {
    const newGrid = grid;
    newGrid.grid[yPos][xPos] = { id: grid.grid[yPos][xPos].id, position: { x: xPos, y: yPos }, type: 'empty', stats: null };

    return newGrid;
}

export function gridReducer(state: grid, action: gridAction): grid {
  switch (action.type) {
    case "ADD_PLAYER":
      return addPlayerToGrid(
        action.formData,
        state,
        action.x,
        action.y
      );

    case "ADD_NPC":
      return addNPCToGrid(
        action.formData,
        state,
        action.x,
        action.y
      );

    case "MOVE_ITEM":
      return swapPositions(
        state,
        action.from,
        action.to
      );

    case "REMOVE_ITEM":
      return removeItemFromGrid(
        state,
        action.x,
        action.y
      );

    default:
      return state;
  }
}