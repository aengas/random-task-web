"use client";

import { Card, CardTitle } from "@/components/ui";
import { AddFixedTaskForm } from "./add-fixed-task-form";
import { FixedTaskList } from "./fixed-task-list";

export function FixedTasksSection() {
  return (
    <Card>
      <CardTitle>📌 Faste tider</CardTitle>
      <div className="mt-4">
        <AddFixedTaskForm />
        <FixedTaskList />
      </div>
    </Card>
  );
}