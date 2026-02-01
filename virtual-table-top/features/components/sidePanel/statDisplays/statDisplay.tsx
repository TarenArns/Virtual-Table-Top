import { Button } from "@/common/ui/button";
import { useGridState } from "@/features/hooks/gridState";

export default function StatDisplay({ gridState }: { gridState: ReturnType<typeof useGridState> }) {
    return (
        (gridState?.selectedItem?.type === 'player' || gridState?.selectedItem?.type === 'npc') ? (
            <div>
                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                <p><strong>Selcted Token:</strong> {gridState?.selectedItem?.stats?.name}</p>
                {gridState?.selectedItem?.stats && 'challengeRating' in gridState.selectedItem.stats && (
                    <p><strong>ChallengeRating:</strong> {gridState?.selectedItem?.stats?.challengeRating}</p>
                )}
                <p><strong>Strength:</strong> {gridState?.selectedItem?.stats?.strength}</p>
                <p><strong>Dexterity:</strong> {gridState?.selectedItem?.stats?.dexterity}</p>
                <p><strong>Constitution:</strong> {gridState?.selectedItem?.stats?.constitution}</p>
                <p><strong>Intelligence:</strong> {gridState?.selectedItem?.stats?.intelligence}</p>
                <p><strong>Wisdom:</strong> {gridState?.selectedItem?.stats?.wisdom}</p>
                <p><strong>Charisma:</strong> {gridState?.selectedItem?.stats?.charisma}</p>
                <p><strong>Movement Speed:</strong> {gridState?.selectedItem?.stats?.movementSpeed}</p>
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
            </div>
        ) : (
            <div>
                <h2 className="text-xl font-bold mb-2">Selected Item</h2>
                <p><strong>Selcted NPC:</strong> {gridState?.selectedItem?.stats?.name}</p>
            </div>
        )
    )
}