import { Button } from "@/common/ui/button";
import { DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, Drawer } from "@/common/ui/drawer";
import { useGridState } from "@/features/hooks/gridState";

export default function ToolsDrawer({ gridState }: { gridState: ReturnType<typeof useGridState> }) {
    return (
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
    )
}