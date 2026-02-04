"use client";

import { useState } from "react";
import { Trash2, Pencil, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox, Input } from "@/components/ui";
import { FixedDateTimeTask } from "@/types";
import { useFixedTaskStore } from "@/stores/fixed-task-store";
import { formatTime } from "@/lib/time-utils";

interface FixedTaskListItemProps {
  task: FixedDateTimeTask;
}

export function FixedTaskListItem({ task }: FixedTaskListItemProps) {
  const { removeFixedTask, toggleDeactivated, updateTaskName } = useFixedTaskStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.taskName);

  function handleSave() {
    if (editValue.trim()) {
      updateTaskName(task.id, editValue.trim());
      setIsEditing(false);
    }
  }

  function handleCancel() {
    setEditValue(task.taskName);
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  }

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
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="p-1.5 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
              aria-label="Lagre"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Avbryt"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>

      {!isEditing && (
        <div className="flex items-center gap-3 shrink-0">
          <Checkbox
            id={`fixed-deactivated-${task.id}`}
            label="Deaktiver"
            checked={task.deactivated}
            onChange={() => toggleDeactivated(task.id)}
          />
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="Rediger fast tid"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => removeFixedTask(task.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            aria-label="Slett fast tid"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}