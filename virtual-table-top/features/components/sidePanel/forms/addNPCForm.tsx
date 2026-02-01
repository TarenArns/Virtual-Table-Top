import { Button } from "@/common/ui/button";
import { FieldGroup, FieldSet, FieldLegend, FieldDescription, Field, FieldLabel } from "@/common/ui/field";
import { Input } from "@/common/ui/input";
import { useGridState } from "@/features/hooks/gridState";

export default function AddNPCForm({ gridState }: { gridState: ReturnType<typeof useGridState> }) {
    return (
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
    )
}