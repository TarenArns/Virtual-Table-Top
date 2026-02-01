import { memo } from "react";
import type { gridItem } from "@/features/types/types";

type Props = {
  item: gridItem;
  onClick: (item: gridItem) => void;
};

function GridCell({ item, onClick }: Props) {
  const hasNoImage = item.type !== "empty" && !item.stats?.image;

  return (

    <div
      className={`grid-item aspect-square border flex items-center justify-center overflow-hidden ${hasNoImage ? "border-red-600 ring-4 ring-red-600 z-100" : "border-blue-400"}`}
      onClick={() => onClick(item)}
    >
      {item.stats?.image ? (
        <img src={item.stats.image} alt={item.stats.name} />
      ) : (
        <div className="text-red-600">{item.stats?.name}</div>
      )}
    </div>
  );
}

export default memo(GridCell);