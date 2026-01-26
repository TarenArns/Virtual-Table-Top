"use client";
import { buildGrid, swapPositions, addPlayerToGrid, addNPCToGrid } from "@/utils/gridUtils";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import background from "../public/Background.jpg";
import type { gridItem, grid } from "@/types/gridTypes";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"


export default function Grid(props: { items: gridItem[], dimensions: { rows: number; columns: number; }; }) {

    const [selectedItem, setSelectedItem] = useState<gridItem | null>(null);
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [battleMap, setBattleMap] = useState<grid>(() => buildGrid(props.items, props.dimensions, background.src));
    const [isAddingPlayer, setIsAddingPlayer] = useState<boolean>(false);
    const [isAddingNPC, setIsAddingNPC] = useState<boolean>(false);
    const [isRemovingItem, setIsRemovingItem] = useState<boolean>(false);
    const [canSubmit, setCanSubmit] = useState<boolean>(false);

    const [isDrawerOpen, setisDrawerOpen] = useState(false)


    const Controls = () => {
        const { resetTransform } = useControls();
        return (
            <div className="tools">
                <button onClick={() => resetTransform()}><MapPin /></button>
            </div>
        );
    };

    function handleClick(item: gridItem): void {
        if ((isAddingPlayer || isAddingNPC) && item.type === 'empty') {
            setSelectedItem(item);
            setCanSubmit(true);
        }
        else if (isMoving && selectedItem && item.type === 'empty') {
            setBattleMap(swapPositions(battleMap, selectedItem, item));
            setIsMoving(false);
            setSelectedItem(null);
        }
        else if (!isMoving && item.type !== 'empty') {
            setSelectedItem(item);
        }
        console.log(selectedItem);
    }

    function clickAddPlayer(): void {
        setCanSubmit(false);
        setIsMoving(false);
        setSelectedItem(null);
        setisDrawerOpen(false);
        setIsAddingPlayer(true);
    }

    function submitAddPlayer(formData: FormData): void {
        if (selectedItem) {
            setBattleMap(addPlayerToGrid(formData, battleMap, selectedItem.position.x, selectedItem.position.y));
            setIsAddingPlayer(false);
            setSelectedItem(null);
            setCanSubmit(false);
            setisDrawerOpen(false);
        }
    }

    function clickAddNPC(): void {
        setCanSubmit(false);
        setIsMoving(false);
        setSelectedItem(null);
        setisDrawerOpen(false);
        setIsAddingNPC(true);
    }

    function submitAddNPC(formData: FormData): void {
        if (selectedItem) {
            setBattleMap(addNPCToGrid(formData, battleMap, selectedItem.position.x, selectedItem.position.y));
            setIsAddingPlayer(false);
            setSelectedItem(null);
            setCanSubmit(false);
            setisDrawerOpen(false);
        }
    }

    function clickRemoveItem(): void {
        setIsRemovingItem(true);
        setIsMoving(false);
        setSelectedItem(null);
        setisDrawerOpen(false);
        setIsRemovingItem(false);
    }

    return (
        <main className="h-full w-full flex">
            <section className="w-[25%] border-r border-gray-300">
                <Drawer open={isDrawerOpen} onOpenChange={setisDrawerOpen}>
                    <DrawerTrigger asChild>
                        <Button>See other tools</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Tools</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 pb-0 flex items-center justify-center">
                                <Button className="w-full m-2" onClick={() => clickAddPlayer()}>Add Player</Button>
                                <Button className="w-full m-2" onClick={() => clickAddNPC()}>Add NPC</Button>
                                <Button className="w-full m-2" onClick={() => clickRemoveItem()}>Remove Item</Button>
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
                    {selectedItem?.stats ? (
                        selectedItem.type === 'player' || selectedItem.type === 'npc' ? (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                                <p><strong>Selcted Token:</strong> {selectedItem.stats.name}</p>
                                {'challengeRating' in selectedItem.stats && (
                                    <p><strong>ChallengeRating:</strong> {selectedItem.stats.challengeRating}</p>
                                )}
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
                                )}
                            </ div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                                <p><strong>Selcted NPC:</strong> {selectedItem.stats.name}</p>
                            </div>
                        )
                    ) : isAddingPlayer ? (
                        <div>
                            <form action={submitAddPlayer} >
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
                                        {selectedItem ? (
                                            <p>Your selected location is <b>X: {selectedItem.position.x} Y: {selectedItem.position.y}</b> such that the top left is (0,0)</p>
                                        ) : (<p><b>Select a location on the grid to place the new player, the top left is (0,0)</b></p>)}
                                        <Field orientation="horizontal">
                                            <Button type="submit" disabled={!canSubmit}>Submit</Button>
                                            <Button onClick={() => setIsAddingPlayer(false)} variant="outline" type="button">
                                                Cancel
                                            </Button>
                                        </Field>
                                    </FieldSet>
                                </FieldGroup>
                            </form>
                        </div>
                    ) : isAddingNPC ? (
                        <div>
                            <form action={submitAddNPC} >
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
                                        {selectedItem ? (
                                            <p>Your selected location is <b>X: {selectedItem.position.x} Y: {selectedItem.position.y}</b> such that the top left is (0,0)</p>
                                        ) : (<p><b>Select a location on the grid to place the new npc, the top left is (0,0)</b></p>)}
                                        <Field orientation="horizontal">
                                            <Button type="submit" disabled={!canSubmit}>Submit</Button>
                                            <Button onClick={() => setIsAddingPlayer(false)} variant="outline" type="button">
                                                Cancel
                                            </Button>
                                        </Field>
                                    </FieldSet>
                                </FieldGroup>
                            </form>
                        </div>
                    ) : isRemovingItem ? (
                        <div>
                            <h2 className="text-xl font-bold mb-2">Remove Item</h2>
                            <p>Click on an item to remove it</p>
                        </div>
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
                        <div>
                            <Controls />
                            <TransformComponent>
                                <div className="grid content-start justify-center h-full w-full overflow-hidden"
                                    style={{
                                        gridTemplateColumns: `repeat(${battleMap.dimensions.columns}, minmax(0, 1fr))`,
                                        backgroundImage: `url(${battleMap.backgroundImage})`,
                                        backgroundSize: "100% 100%",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}>
                                    {battleMap.grid.map((cols) => (
                                        cols.map((item) => (
                                            <div key={item.id} className="grid-item aspect-square border border-blue-400 flex items-center justify-center overflow-hidden" onClick={() => handleClick(item)}>
                                                {item.stats?.image ? (
                                                    <img src={item.stats.image} alt={item.stats.name} />
                                                ) : (
                                                    <div className="text-red-600">{item.stats?.name}</div>
                                                )
                                                }
                                            </div>
                                        ))
                                    ))}
                                </div>
                            </TransformComponent>
                        </div>
                    </TransformWrapper>
                </div>
            </section>
        </main>
    )
}