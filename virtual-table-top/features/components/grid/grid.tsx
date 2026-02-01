"use client";
import { buildGrid, gridReducer } from "@/features/utils/utils";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { MapPin } from "lucide-react";
import { useReducer, useState, useMemo, useCallback } from "react";
import { Button } from "@/common/ui/button";
import background from "@/public/Background.jpg";
import type { gridItem, grid, gridMode } from "@/features/types/types";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/common/ui/drawer"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/common/ui/field"
import { useGridState } from "@/features/hooks/gridState";

import { Input } from "@/common/ui/input"
import GridCell from "./gridCell";
import ToolsDrawer from "../toolsDrawer/toolsDrawer";
import SidePanel from "../sidePanel/sidePanel";


export default function Grid({ items, dimensions, }: { items: gridItem[]; dimensions: { rows: number; columns: number }; }) {

    const gridState = useGridState(items, dimensions, background.src);

    const Controls = () => {
        const { resetTransform } = useControls();
        return (
            <div className="tools">
                <button onClick={() => resetTransform()}><MapPin /></button>
            </div>
        );
    };

    const gridCells = useMemo(() => {
        return gridState.battleMap.grid.flat().map((item) => (
            <GridCell
                key={item.id}
                item={item}
                onClick={gridState.handleGridClick}
            />
        ));
    }, [gridState.battleMap.grid, gridState.handleGridClick]);



    return (
        <main className="h-full w-full flex">
            <section className="w-[25%] border-r border-gray-300">
                <ToolsDrawer gridState={gridState} />
                <SidePanel gridState={gridState} />
            </section >
            <section className="w-[75%]">
                <div className="border-4 border-gray-300">
                    <TransformWrapper
                        limitToBounds={false}
                        centerOnInit
                        minScale={0.1}
                        maxScale={10}
                    >
                        <div>
                            <Controls />
                            <TransformComponent>
                                <div className="grid content-start justify-center h-full w-full overflow-hidden"
                                    style={{
                                        gridTemplateColumns: `repeat(${gridState.battleMap.dimensions.columns}, minmax(0, 1fr))`,
                                        backgroundImage: `url(${gridState.battleMap.backgroundImage})`,
                                        backgroundSize: "100% 100%",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}>
                                    {gridCells}
                                </div>
                            </TransformComponent>
                        </div>
                    </TransformWrapper>
                </div>
            </section>
        </main >
    )
}
