import Grid from "@/components/grid";
import blarg from "../public/Blarg.png";
import edvard from "../public/brad (edvard sangren).jpg";
import three from "../public/sam (three).jpg";
import cheese from "../public/colton (big cheese).jpg";
import miles from "../public/will (miles dei).jpg";


export default function Home() {

  const players: playerCharacter[] = [
    { name: "Three", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30, image: three.src },
    { name: "OJ \"Big Cheese\" Simpson", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30, image: cheese.src },
    { name: "Edvard Sangren", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30, image: edvard.src },
    { name: "Miles Dei", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30, image: miles.src },
    { name: "Blarg", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30, image: blarg.src },
  ]

  const items: gridItem[] = [
    { id: 1, position: { x: 0, y: 0 }, type: 'player', stats: players[0] },
    { id: 2, position: { x: 10, y: 10 }, type: 'player', stats: players[1] },
    { id: 3, position: { x: 0, y: 19 }, type: 'player', stats: players[2] },
    { id: 4, position: { x: 19, y: 0 }, type: 'player', stats: players[3] },
    { id: 5, position: { x: 19, y: 19 }, type: 'player', stats: players[4] },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center border border-gray-300">
      <Grid items={items} dimensions={{ rows: 20, columns: 20 }} />
    </div>

  );
}
