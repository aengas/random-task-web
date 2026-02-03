import { PlanItem } from "@/types";
import { formatTime } from "@/lib/time-utils";
import { cn } from "@/lib/utils";

interface PlanListProps {
  items: PlanItem[];
}

export function PlanList({ items }: PlanListProps) {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <PlanListItem
          key={index}
          item={item}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
}

interface PlanListItemProps {
  item: PlanItem;
  isLast: boolean;
}

function PlanListItem({ item, isLast }: PlanListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 p-3 rounded-lg transition-colors",
        isLast
          ? "bg-green-50 border border-green-200"
          : "bg-gray-50 hover:bg-gray-100"
      )}
    >
      <time className="text-lg font-mono font-semibold text-gray-700 w-16">
        {formatTime(item.time)}
      </time>
      <div className="flex-1">
        <span
          className={cn(
            "font-medium",
            isLast ? "text-green-700" : "text-gray-900"
          )}
        >
          {item.taskName}
        </span>
      </div>
    </div>
  );
}