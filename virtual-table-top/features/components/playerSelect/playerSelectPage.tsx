import { Button } from "@/common/ui/button";

export default function PlayerSelectPage() {

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center border border-gray-300">
            <h1 className="text-4xl font-bold">Select Player type</h1>
            <div className="flex flex-col m-4">
                <Button className="m-4 p-4" variant="outline">Dungeon Master</Button>
                <Button className="m-4 p-4" variant="outline">Player</Button>
            </div>
        </div >



    )
}
