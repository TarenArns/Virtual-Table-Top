"use client";
import { buildGrid } from "@/utils/gridUtils";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { MapPin } from "lucide-react";


export default function Grid(props: { items: gridItem[], dimensions: { rows: number; columns: number; }; }) {


    const battleMap: grid = buildGrid(props.items, props.dimensions);
    const Controls = () => {
        const { resetTransform } = useControls();
        return (
            <div className="tools">
                <button onClick={() => resetTransform()}><MapPin /></button>
            </div>
        );
    };

    return (
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
                            <div className="grid content-start justify-center h-full w-full ovewrflow-hidden"
                                style={{
                                    gridTemplateColumns: `repeat(${props.dimensions.columns}, minmax(0, 1fr))`,
                                }}>
                                {battleMap.grid.map((cols) => (
                                    cols.map((item) => (
                                        <div key={item.id} className="grid-item aspect-square border border-blue-400 flex items-center justify-center overflow-hidden">
                                            <img src={item.content}/>
                                        </div>
                                    ))
                                ))}
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    )
}