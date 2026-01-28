import Grid from "@/features/grid/components/grid";
import blarg from "../public/Blarg.png";
import edvard from "../public/brad (edvard sangren).jpg";
import three from "../public/sam (three).jpg";
import cheese from "../public/colton (big cheese).jpg";
import miles from "../public/will (miles dei).jpg";
import type { playerCharacter, npcCharacter, gridItem } from "@/features/grid/types/types";


export default function Home() {

  const players: playerCharacter[] = [
    { name: "Three", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30,  armourClass: 15, image: three.src },
    { name: "OJ \"Big Cheese\" Simpson", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30,  armourClass: 15, image: cheese.src },
    { name: "Edvard Sangren", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30,  armourClass: 15, image: edvard.src },
    { name: "Miles Dei", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30,  armourClass: 15, image: miles.src },
    { name: "Blarg", strength: 20, dexterity: 20, constitution: 20, wisdom: 20, intelligence: 20, charisma: 20, movementSpeed: 30, armourClass: 15, image: blarg.src },
  ]

  const NPCs: npcCharacter[] = [
    { name: "Goblin", challengeRating: 0.25, strength: 8, dexterity: 14, constitution: 10, wisdom: 8, intelligence: 10, charisma: 8, movementSpeed: 30, armourClass: 15, image: undefined },
    { name: "Orc", challengeRating: 0.5, strength: 16, dexterity: 12, constitution: 16, wisdom: 11, intelligence: 10, charisma: 10, movementSpeed: 30, armourClass: 15, image: undefined },
    { name: "Troll", challengeRating: 5, strength: 23, dexterity: 13, constitution: 20, wisdom: 9, intelligence: 7, charisma: 7, movementSpeed: 30, armourClass: 15, image: undefined },
  ]

  const items: gridItem[] = [
    { id: 1, position: { x: 0, y: 0 }, type: 'player', stats: players[0] },
    { id: 2, position: { x: 10, y: 10 }, type: 'player', stats: players[1] },
    { id: 3, position: { x: 0, y: 19 }, type: 'player', stats: players[2] },
    { id: 4, position: { x: 19, y: 0 }, type: 'player', stats: players[3] },
    { id: 5, position: { x: 19, y: 19 }, type: 'player', stats: players[4] },
    { id: 6, position: { x: 5, y: 5 }, type: 'npc', stats: NPCs[0] },
    { id: 7, position: { x: 15, y: 15 }, type: 'npc', stats: NPCs[1] },
    { id: 8, position: { x: 10, y: 5 }, type: 'npc', stats: NPCs[2] },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center border border-gray-300">
      <Grid items={items} dimensions={{ rows: 20, columns:20 }} />
    </div>

  );
}
