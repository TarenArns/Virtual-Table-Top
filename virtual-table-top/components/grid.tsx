"use client";
import { buildGrid, swapPositions } from "@/utils/gridUtils";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import background from "../public/Background.jpg";



export default function Grid(props: { items: gridItem[], dimensions: { rows: number; columns: number; }; }) {

    const [selectedItem, setSelectedItem] = useState<gridItem | null>(null);
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [battleMap, setBattleMap] = useState<grid>(() => buildGrid(props.items, props.dimensions));

    const Controls = () => {
        const { resetTransform } = useControls();
        return (
            <div className="tools">
                <button onClick={() => resetTransform()}><MapPin /></button>
            </div>
        );
    };

    function handleClick(item: gridItem) {
        if (isMoving && selectedItem && item.type === 'empty') {
            setBattleMap(swapPositions(battleMap, selectedItem, item));
            setIsMoving(false);
            setSelectedItem(null);
        }
        else if (!isMoving && item.type !== 'empty') {
            setSelectedItem(item);
        }
        console.log(selectedItem);
    }

    return (
        <main className="h-full w-full flex">
            <section className="w-[25%] border-r border-gray-300">
                <div className="selected-item-info p-4 border-b border-gray-300">
                    {selectedItem?.stats ? (
                        selectedItem.type === 'player' || selectedItem.type === 'npc' ? (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                                <p><strong>Selcted Player:</strong> {selectedItem.stats.name}</p>
                                <p><strong>Strength:</strong> {selectedItem.stats.strength}</p>
                                <p><strong>Dexterity:</strong> {selectedItem.stats.dexterity}</p>
                                <p><strong>Constitution:</strong> {selectedItem.stats.constitution}</p>
                                <p><strong>Intelligence:</strong> {selectedItem.stats.intelligence}</p>
                                <p><strong>Wisdom:</strong> {selectedItem.stats.wisdom}</p>
                                <p><strong>Charisma:</strong> {selectedItem.stats.charisma}</p>
                                <p><strong>Movement Speed:</strong> {selectedItem.stats.movementSpeed}</p>
                                {!isMoving ? (
                                    <Button size="sm" onClick={() => setIsMoving(true)}>
                                        Move
                                    </Button>
                                ) : (
                                    <div className="text-red-600">
                                        select an empty location to move to
                                        <Button size="sm" disabled={true}>
                                            Move
                                        </Button>
                                    </div>
                                )
                                }
                            </ div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                                <p><strong>Selcted NPC:</strong> {selectedItem.stats.name}</p>
                            </div>
                        )
                    ) : (
                        <h2 className="text-xl font-bold mb-2">No Item Selected</h2>
                    )}
                </div>
            </section>
            <section className="w-[75%]">
                <div className="border-4 border-gray-300">
                    <TransformWrapper
                        limitToBounds={false}
                        centerOnInit
                        minScale={0.1}
                        maxScale={10}
                    >
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <div>
                                <Controls />
                                <TransformComponent>
                                    <div className="grid content-start justify-center h-full w-full overflow-hidden"
                                        style={{
                                            gridTemplateColumns: `repeat(${props.dimensions.columns}, minmax(0, 1fr))`,
                                            backgroundImage: `url(${background.src})`,
                                            backgroundSize: "100% 100%",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}>
                                        {battleMap.grid.map((cols) => (
                                            cols.map((item) => (
                                                <div key={item.id} className="grid-item aspect-square border border-blue-400 flex items-center justify-center overflow-hidden" onClick={() => handleClick(item)}>
                                                    {item.stats?.image ? (
                                                        <img src={item.stats.image} />
                                                    ) : (
                                                        <div className="text-black">{item.stats?.name}</div>
                                                    )
                                                    }
                                                </div>
                                            ))
                                        ))}
                                    </div>
                                </TransformComponent>
                            </div>
                        )}
                    </TransformWrapper>
                </div>
            </section>
        </main>
    )
}