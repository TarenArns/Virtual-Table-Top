import { Button } from "@/common/ui/button";
import { Field } from "@/common/ui/field";
import { useGridState } from "@/features/hooks/gridState";

export default function RemoveItemConfirmation({ gridState }: { gridState: ReturnType<typeof useGridState> }) {
    return (
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
    )
}
