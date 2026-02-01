import { Button } from "@/common/ui/button";
import { FieldGroup, FieldSet, FieldLegend, FieldDescription, Field, FieldLabel } from "@/common/ui/field";
import { Input } from "@/common/ui/input";
import { useGridState } from "@/features/hooks/gridState";

export default function AddPlayerForm({ gridState }: { gridState: ReturnType<typeof useGridState> }) {
    return (
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
    )
}