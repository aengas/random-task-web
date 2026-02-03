"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui";
import { FixedDateTimeTask } from "@/types";
import { useFixedTaskStore } from "@/stores/fixed-task-store";
import { formatTime } from "@/lib/time-utils";

interface FixedTaskListItemProps {
  task: FixedDateTimeTask;
}

export function FixedTaskListItem({ task }: FixedTaskListItemProps) {
  const { removeFixedTask, toggleDeactivated } = useFixedTaskStore();

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all",
        task.deactivated
          ? "bg-gray-100 border-gray-200 opacity-60"
          : "bg-white border-gray-200 hover:border-gray-300"
      )}
    >
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium truncate",
            task.deactivated && "line-through text-gray-500"
          )}
        >
          {task.taskName}
        </p>
        <p className="text-sm text-gray-500">
          {formatTime(task.startTime)} - {formatTime(task.stopTime)}
        </p>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <Checkbox
          id={`fixed-deactivated-${task.id}`}
          label="Deaktiver"
          checked={task.deactivated}
          onChange={() => toggleDeactivated(task.id)}
        />
        <button
          onClick={() => removeFixedTask(task.id)}
          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
          aria-label="Slett fast tid"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}