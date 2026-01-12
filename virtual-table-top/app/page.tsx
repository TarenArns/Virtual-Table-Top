import Grid from "@/components/grid";
import blarg from "../public/Blarg.png";
import edvard from "../public/brad (edvard sangren).jpg";
import three from "../public/sam (three).jpg";
import cheese from "../public/colton (big cheese).jpg";
import miles from "../public/will (miles dei).jpg";


export default function Home() {

  const players: playerCharacter[] = [
    { name: "Three", image: three.src },
    { name: "OJ \"Big Cheese\" Simpson", image: cheese.src },
    { name: "Edvard Sangren", image: edvard.src },
    { name: "Miles Dei", image: miles.src },
    { name: "Blarg", image: blarg.src },
  ]

  const items: gridItem[] = [
    { id: 1, position: { x: 0, y: 0 }, player: players[0] },
    { id: 2, position: { x: 10, y: 10 }, player: players[1] },
    { id: 3, position: { x: 0, y: 19 }, player: players[2] },
    { id: 4, position: { x: 19, y: 0 }, player: players[3] },
    { id: 5, position: { x: 19, y: 19 }, player: players[4] },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center border border-gray-300">
      <Grid items={items} dimensions={{ rows: 30, columns: 30 }} />
    </div>

  );
}
