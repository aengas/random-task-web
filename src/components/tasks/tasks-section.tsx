"use client";

import { Card, CardTitle } from "@/components/ui";
import { AddTaskForm } from "./add-task-form";
import { TaskList } from "./task-list";
 
export function TasksSection() {
  return (
    <Card>
      <CardTitle>📝 Oppgaver</CardTitle>
      <div className="mt-4">
        <AddTaskForm />
        <TaskList />
      </div>
    </Card>
  );
}