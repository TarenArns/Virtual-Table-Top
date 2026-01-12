"use client";
import { buildGrid } from "@/utils/gridUtils";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useState } from "react";


export default function Grid(props: { items: gridItem[], dimensions: { rows: number; columns: number; }; }) {


    const [selectedItem, setSelectedItem] = useState<gridItem | null>(null);


    var battleMap: grid = buildGrid(props.items, props.dimensions);
    const Controls = () => {
        const { resetTransform } = useControls();
        return (
            <div className="tools">
                <button onClick={() => resetTransform()}><MapPin /></button>
            </div>
        );
    };

    function handleClick(item: gridItem) {
        setSelectedItem(item);
    }

    return (
        <main className="h-full w-full flex">
            <section>
                <div className="selected-item-info p-4 border-b border-gray-300">

                    {selectedItem ? (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                            <p><strong>Selcted Player:</strong> {selectedItem.player.name}</p>
                        </ div>
                    ) : (
                        <h2 className="text-xl font-bold mb-2">No Item Selected</h2>
                    )}
                </div>
            </section>
            <section className="flex-grow">
                <div className="border-4 border-gray-300">
                    <TransformWrapper
                        limitToBounds={false}
                        centerOnInit
                        minScale={0.1}
                        maxScale={10}
                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <>
                                <Controls />
                                <TransformComponent>
                                    <div className="grid content-start justify-center h-full w-full overflow-hidden"
                                        style={{
                                            gridTemplateColumns: `repeat(${props.dimensions.columns}, minmax(0, 1fr))`,
                                        }}>
                                        {battleMap.grid.map((cols) => (
                                            cols.map((item) => (
                                                <div key={item.id} className="grid-item aspect-square border border-blue-400 flex items-center justify-center overflow-hidden" onClick={() => handleClick(item)}>
                                                    <img src={item.player.image} />
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                </TransformComponent>
                            </>
                        )}
                    </TransformWrapper>
                </div>
            </section>
        </main>
    )
}