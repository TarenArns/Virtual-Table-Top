import { memo } from "react";
import type { gridItem } from "@/features/types/types";

type Props = {
  item: gridItem;
  onClick: (item: gridItem) => void;
};

function GridCell({ item, onClick }: Props) {
  return (
    <div
      className="grid-item aspect-square border border-blue-400 flex items-center justify-center overflow-hidden"
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