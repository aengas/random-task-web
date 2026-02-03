"use client";

import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui";
import { RandomTask } from "@/types";
import { useTaskStore } from "@/stores/task-store";

interface TaskListItemProps {
  task: RandomTask;
  index: number;
}

export function TaskListItem({ task, index }: TaskListItemProps) {
    const { removeTask, toggleRequired, toggleDeactivated } = useTaskStore();

    return (
      <div
        className={cn(
            "flex items-center gap-3 p-3 rounded-lg border transition-all",
            task.deactivated
            ? "bg-gray-100 border-gray-200 opacity-60"
            : "bg-white border-gray-200 hover:border-gray-300"
        )}
        >
        <span className="text-sm text-gray-400 w-6">{index + 1}</span>
        
        <div className="flex-1 min-w-0">
            <p className={cn(
            "font-medium truncate",
            task.deactivated && "line-through text-gray-500"
            )}>
            {task.description}
            </p>
            {task.comment && (
            <p className="text-sm text-gray-500 truncate">{task.comment}</p>
            )}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
            <Checkbox
            id={`required-${task.id}`}
            label="Påkrevd"
            checked={task.required}
            onChange={() => toggleRequired(task.id)}
            />
            <Checkbox
            id={`deactivated-${task.id}`}
            label="Deaktiver"
            checked={task.deactivated}
            onChange={() => toggleDeactivated(task.id)}
            />
            <button
            onClick={() => removeTask(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Slett oppgave"
            >
            <Trash2 className="w-4 h-4" />
            </button>
        </div>
        </div>
    );
}