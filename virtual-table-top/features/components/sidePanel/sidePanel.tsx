import { useGridState } from "@/features/hooks/gridState";
import StatDisplay from "./statDisplays/statDisplay";
import AddPlayerForm from "./forms/addPlayerForm";
import AddNPCForm from "./forms/addNPCForm";
import RemoveItemConfirmation from "./toolPanels/removeItemConfirmation";

export default function SidePanel({ gridState }: { gridState: ReturnType<typeof useGridState> }) {
    return (
        <div className="selected-item-info p-4 border-b border-gray-300">
            {gridState.selectedItem?.stats && (gridState.mode !== "removing") ? (
                <StatDisplay gridState={gridState} />
            ) : (gridState.mode === "addingPlayer") ? (
                <AddPlayerForm gridState={gridState} />
            ) : gridState.mode === "addingNPC" ? (
                <AddNPCForm gridState={gridState} />
            ) : gridState.mode === "removing" ? (
                <RemoveItemConfirmation gridState={gridState} />
            ) : (
                <h2 className="text-xl font-bold mb-2">Actions and information will appear here</h2>
            )
            }
        </div >
    )
}