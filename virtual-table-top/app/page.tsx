import Grid from "@/components/grid";

export default function Home() {


  const items: gridItem[] = [
    { id: 1, position: { x: 0, y: 0 }, content: "Item 1" },
    { id: 2, position: { x: 2, y: 0 }, content: "Item 2" },
    { id: 3, position: { x: 0, y: 2 }, content: "Item 3" },
    { id: 4, position: { x: 2, y: 2 }, content: "Item 4" },
  ]

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Grid items={items} dimensions={{ rows: 5, columns: 5 }} />
    </div>
  );
}
