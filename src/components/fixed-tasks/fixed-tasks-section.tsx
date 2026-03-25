"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardTitle, Button } from "@/components/ui";
import { AddFixedTaskForm } from "./add-fixed-task-form";
import { FixedTaskList } from "./fixed-task-list";
import { useFixedTaskStore } from "@/stores/fixed-task-store";

export function FixedTasksSection() {
  const fixedTasks = useFixedTaskStore((state) => state.fixedTasks);
  const removeAllFixedTasks = useFixedTaskStore((state) => state.removeAllFixedTasks);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDeleteAll() {
    if (!confirm("Er du sikker på at du vil slette alle faste tider?")) return;
    
    setIsDeleting(true);
    await removeAllFixedTasks();
    setIsDeleting(false);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardTitle>📌 Faste tider</CardTitle>
        {fixedTasks.length > 0 && (
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
        <AddFixedTaskForm />
        <FixedTaskList />
      </div>
    </Card>
  );
}