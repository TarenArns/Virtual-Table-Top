import React from "react"
import { buildGrid } from "@/utils/gridUtils";


export default function Grid(props: { items: gridItem[], dimensions: { rows: number; columns: number; }; }) {


    const battleMap: grid = buildGrid(props.items, props.dimensions);

    return (
        <div className="h-full w-full grid p-4 border border-gray-300"
            style={{
                gridTemplateRows: `repeat(${props.dimensions.rows}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${props.dimensions.columns}, minmax(0, 1fr))`,
            }}>
            {battleMap.grid.map((cols) => (
                cols.map((item) => (
                    <div key={item.id} className="grid-item border border-blue-400 flex items-center justify-center">
                        {item.content}
                    </div>
                ))
            ))}
        </div>
    )
}