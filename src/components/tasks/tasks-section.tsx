"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardTitle, Button } from "@/components/ui";
import { AddTaskForm } from "./add-task-form";
import { TaskList } from "./task-list";
import { useTaskStore } from "@/stores/task-store";

export function TasksSection() {
  const tasks = useTaskStore((state) => state.tasks);
  const removeAllTasks = useTaskStore((state) => state.removeAllTasks);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteAll() {
    if (!confirm("Er du sikker på at du vil slette alle oppgaver?")) return;
    
    setIsDeleting(true);
    await removeAllTasks();
    setIsDeleting(false);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardTitle>📝 Oppgaver</CardTitle>
        {tasks.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteAll}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {isDeleting ? "Sletter..." : "Slett alle"}
          </Button>
        )}
      </div>
      <div className="mt-4">
        <AddTaskForm />
        <TaskList />
      </div>
    </Card>
  );
}