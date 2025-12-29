import Grid from "@/components/grid";
import blarg from "../public/Blarg.png";
import edvard from "../public/brad (edvard sangren).jpg";
import three from "../public/sam (three).jpg";
import cheese from "../public/colton (big cheese).jpg";
import miles from "../public/will (miles dei).jpg";


export default function Home() {


  const items: gridItem[] = [
    { id: 1, position: { x: 0, y: 0 }, content: three.src },
    { id: 2, position: { x: 10, y: 10 }, content: cheese.src },
    { id: 3, position: { x: 0, y: 19 }, content: edvard.src },
    { id: 4, position: { x: 19, y: 0 }, content: blarg.src },
    { id: 5, position: { x: 19, y: 19 }, content: miles.src },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center border border-gray-300">
      <Grid items={items} dimensions={{ rows: 30, columns: 30 }} />
    </div>

  );
}
