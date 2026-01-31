"use client";
import { buildGrid, gridReducer } from "@/features/grid/utils/utils";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { MapPin } from "lucide-react";
import { useReducer, useState, useMemo, useCallback } from "react";
import { Button } from "@/common/ui/button";
import background from "@/public/Background.jpg";
import type { gridItem, grid, gridMode } from "@/features/grid/types/types";
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
import { useGridState } from "@/features/grid/hooks/gridState";

import { Input } from "@/common/ui/input"
import GridCell from "./gridCell";


export default function Grid(props: { items: gridItem[], dimensions: { rows: number; columns: number; }; }) {

    const gridState = useGridState(props.items, props.dimensions, background.src);

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
                <Drawer open={gridState.isDrawerOpen} onOpenChange={gridState.setisDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button>See other tools</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Tools</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 pb-0 flex items-center justify-center">
                                <Button className="w-full m-2" onClick={() => gridState.clickAddPlayer()}>Add Player</Button>
                                <Button className="w-full m-2" onClick={() => gridState.clickAddNPC()}>Add NPC</Button>
                                <Button className="w-full m-2" onClick={() => gridState.clickRemoveItem()}>Remove Item</Button>
                            </div>
                            <DrawerFooter>
                                <DrawerClose asChild>
                                    <Button variant="destructive">Close</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
                <div className="selected-item-info p-4 border-b border-gray-300">
                    {gridState.selectedItem?.stats && (gridState.mode !== "removing") ? (
                        (gridState.selectedItem.type === 'player' || gridState.selectedItem.type === 'npc') ? (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                                <p><strong>Selcted Token:</strong> {gridState.selectedItem.stats.name}</p>
                                {'challengeRating' in gridState.selectedItem.stats && (
                                    <p><strong>ChallengeRating:</strong> {gridState.selectedItem.stats.challengeRating}</p>
                                )}
                                <p><strong>Strength:</strong> {gridState.selectedItem.stats.strength}</p>
                                <p><strong>Dexterity:</strong> {gridState.selectedItem.stats.dexterity}</p>
                                <p><strong>Constitution:</strong> {gridState.selectedItem.stats.constitution}</p>
                                <p><strong>Intelligence:</strong> {gridState.selectedItem.stats.intelligence}</p>
                                <p><strong>Wisdom:</strong> {gridState.selectedItem.stats.wisdom}</p>
                                <p><strong>Charisma:</strong> {gridState.selectedItem.stats.charisma}</p>
                                <p><strong>Movement Speed:</strong> {gridState.selectedItem.stats.movementSpeed}</p>
                                {(gridState.mode !== "moving") ? (
                                    <Button size="sm" onClick={() => gridState.setMode("moving")}>
                                        Move
                                    </Button>
                                ) : (
                                    <div className="text-red-600">
                                        select an empty location to move to
                                        <Button size="sm" disabled={true}>
                                            Move
                                        </Button>
                                    </div>
                                )}
                            </ div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                                <p><strong>Selcted NPC:</strong> {gridState.selectedItem.stats.name}</p>
                            </div>
                        )
                    ) : (gridState.mode === "addingPlayer") ? (
                        <div>
                            <form action={gridState.submitAddPlayer} >
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>
                                            Adding New Player
                                        </FieldLegend>
                                        <FieldDescription>
                                            Enter the stats for the player you want to add
                                        </FieldDescription>
                                        <Field>
                                            <FieldLabel htmlFor="player-name">
                                                Name
                                            </FieldLabel>
                                            <Input
                                                id="player-name"
                                                name="player-name"
                                                placeholder="Hero Man"
                                                required
                                            />
                                        </Field>
                                        <div className="grid grid-cols-3 gap-4">
                                            <Field>
                                                <FieldLabel htmlFor="player-strength">
                                                    Strength
                                                </FieldLabel>
                                                <Input
                                                    id="player-strength"
                                                    name="player-strength"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="player-dexterity">
                                                    Dexterity
                                                </FieldLabel>
                                                <Input
                                                    id="player-dexterity"
                                                    name="player-dexterity"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="player-constitution">
                                                    Constitution
                                                </FieldLabel>
                                                <Input
                                                    id="player-constitution"
                                                    name="player-constitution"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="player-intelligence">
                                                    Intelligence
                                                </FieldLabel>
                                                <Input
                                                    id="player-intelligence"
                                                    name="player-intelligence"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="player-wisdom">
                                                    Wisdom
                                                </FieldLabel>
                                                <Input
                                                    id="player-wisdom"
                                                    name="player-wisdom"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="player-charisma">
                                                    Charisma
                                                </FieldLabel>
                                                <Input
                                                    id="player-charisma"
                                                    name="player-charisma"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">

                                            <Field>
                                                <FieldLabel htmlFor="player-armour-class">
                                                    Armour Class
                                                </FieldLabel>
                                                <Input
                                                    id="player-armour-class"
                                                    name="player-armour-class"
                                                    placeholder="15"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="player-movement-speed">
                                                    Movement Speed
                                                </FieldLabel>
                                                <Input
                                                    id="player-movement-speed"
                                                    name="player-movement-speed"
                                                    placeholder="30"
                                                    required
                                                />
                                            </Field>
                                        </div>
                                        {gridState.selectedItem ? (
                                            <p>Your selected location is <b>X: {gridState.selectedItem.position.x} Y: {gridState.selectedItem.position.y}</b> such that the top left is (0,0)</p>
                                        ) : (<p><b>Select a location on the grid to place the new player, the top left is (0,0)</b></p>)}
                                        <Field orientation="horizontal">
                                            <Button type="submit" disabled={!gridState.canSubmit}>Submit</Button>
                                            <Button onClick={() => gridState.setMode("idle")} variant="outline" type="button">
                                                Cancel
                                            </Button>
                                        </Field>
                                    </FieldSet>
                                </FieldGroup>
                            </form>
                        </div>
                    ) : gridState.mode === "addingNPC" ? (
                        <div>
                            <form action={gridState.submitAddNPC} >
                                <FieldGroup>
                                    <FieldSet>
                                        <FieldLegend>
                                            Adding New NPC
                                        </FieldLegend>
                                        <FieldDescription>
                                            Enter the stats for the NPC you want to add
                                        </FieldDescription>
                                        <Field>
                                            <FieldLabel htmlFor="npc-name">
                                                Name
                                            </FieldLabel>
                                            <Input
                                                id="npc-name"
                                                name="npc-name"
                                                placeholder="Hero Man"
                                                required
                                            />
                                        </Field>
                                        <Field>
                                            <FieldLabel htmlFor="npc-challenge-rating">
                                                challenge Rating
                                            </FieldLabel>
                                            <Input
                                                id="npc-challenge-rating"
                                                name="npc-challenge-rating"
                                                placeholder="2"
                                                required
                                            />
                                        </Field>
                                        <div className="grid grid-cols-3 gap-4">
                                            <Field>
                                                <FieldLabel htmlFor="npc-strength">
                                                    Strength
                                                </FieldLabel>
                                                <Input
                                                    id="npc-strength"
                                                    name="npc-strength"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>

                                            <Field>
                                                <FieldLabel htmlFor="npc-dexterity">
                                                    Dexterity
                                                </FieldLabel>
                                                <Input
                                                    id="npc-dexterity"
                                                    name="npc-dexterity"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="npc-constitution">
                                                    Constitution
                                                </FieldLabel>
                                                <Input
                                                    id="npc-constitution"
                                                    name="npc-constitution"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="npc-intelligence">
                                                    Intelligence
                                                </FieldLabel>
                                                <Input
                                                    id="npc-intelligence"
                                                    name="npc-intelligence"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="npc-wisdom">
                                                    Wisdom
                                                </FieldLabel>
                                                <Input
                                                    id="npc-wisdom"
                                                    name="npc-wisdom"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="npc-charisma">
                                                    Charisma
                                                </FieldLabel>
                                                <Input
                                                    id="npc-charisma"
                                                    name="npc-charisma"
                                                    placeholder="10"
                                                    required
                                                />
                                            </Field>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">

                                            <Field>
                                                <FieldLabel htmlFor="npc-armour-class">
                                                    Armour Class
                                                </FieldLabel>
                                                <Input
                                                    id="npc-armour-class"
                                                    name="npc-armour-class"
                                                    placeholder="15"
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor="npc-movement-speed">
                                                    Movement Speed
                                                </FieldLabel>
                                                <Input
                                                    id="npc-movement-speed"
                                                    name="npc-movement-speed"
                                                    placeholder="30"
                                                    required
                                                />
                                            </Field>
                                        </div>
                                        {gridState.selectedItem ? (
                                            <p>Your selected location is <b>X: {gridState.selectedItem.position.x} Y: {gridState.selectedItem.position.y}</b> such that the top left is (0,0)</p>
                                        ) : (<p><b>Select a location on the grid to place the new npc, the top left is (0,0)</b></p>)}
                                        <Field orientation="horizontal">
                                            <Button type="submit" disabled={!gridState.canSubmit}>Submit</Button>
                                            <Button onClick={() => gridState.setMode("idle")} variant="outline" type="button">
                                                Cancel
                                            </Button>
                                        </Field>
                                    </FieldSet>
                                </FieldGroup>
                            </form>
                        </div>
                    ) : gridState.mode === "removing" ? (
                        <div>
                            Removing Token
                            {gridState.selectedItem ? (
                                <p>Your selected location is <b>X: {gridState.selectedItem.position.x} Y: {gridState.selectedItem.position.y}</b> such that the top left is (0,0)</p>
                            ) : (<p><b>Select a location on the grid to place the new npc, the top left is (0,0)</b></p>)}
                            <Field orientation="horizontal">
                                <Button type="submit" disabled={!gridState.canSubmit} onClick={gridState.submitRemoveItem}>Submit</Button>
                                <Button onClick={() => gridState.setMode("idle")} variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Field>
                        </div>

                    ) : (
                        <h2 className="text-xl font-bold mb-2">No Item Selected</h2>
                    )
                    }
                </div >
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
