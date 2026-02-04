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
          ? "bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-60"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      )}
    >
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium truncate text-gray-900 dark:text-gray-100",
            task.deactivated && "line-through text-gray-500 dark:text-gray-400"
          )}
        >
          {task.taskName}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {formatTime(task.startTime)} - {formatTime(task.stopTime)}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Checkbox
          id={`fixed-deactivated-${task.id}`}
          label="Deaktiver"
          checked={task.deactivated}
          onChange={() => toggleDeactivated(task.id)}
        />
        <button
          onClick={() => removeFixedTask(task.id)}
          className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          aria-label="Slett fast tid"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}