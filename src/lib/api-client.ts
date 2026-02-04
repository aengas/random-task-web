import { RandomTask, FixedDateTimeTask } from "@/types";

interface TaskFromApi {
  id: string;
  description: string;
  required: boolean;
  deactivated: boolean;
  comment: string | null;
}

interface FixedTaskFromApi {
  id: string;
  taskName: string;
  startTime: string;
  stopTime: string;
  deactivated: boolean;
}

export async function fetchTasks(): Promise<RandomTask[]> {
  const response = await fetch("/api/tasks");
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
}

export async function createTask(data: {
  description: string;
  required?: boolean;
  comment?: string;
}): Promise<RandomTask> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create task");
  return response.json();
}

export async function updateTask(
  id: string,
  data: Partial<RandomTask>
): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update task");
}

export async function deleteTask(id: string): Promise<void> {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete task");
}

export async function fetchFixedTasks(): Promise<FixedDateTimeTask[]> {
  const response = await fetch("/api/fixed-tasks");
  if (!response.ok) throw new Error("Failed to fetch fixed tasks");
  const data: FixedTaskFromApi[] = await response.json();
  return data.map((task) => ({
    ...task,
    startTime: new Date(task.startTime),
    stopTime: new Date(task.stopTime),
  }));
}

export async function createFixedTask(data: {
  taskName: string;
  startTime: Date;
  stopTime: Date;
}): Promise<FixedDateTimeTask> {
  const response = await fetch("/api/fixed-tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      startTime: data.startTime.toISOString(),
      stopTime: data.stopTime.toISOString(),
    }),
  });
  if (!response.ok) throw new Error("Failed to create fixed task");
  const result: FixedTaskFromApi = await response.json();
  return {
    ...result,
    startTime: new Date(result.startTime),
    stopTime: new Date(result.stopTime),
  };
}

export async function updateFixedTask(
  id: string,
  data: Partial<FixedDateTimeTask>
): Promise<void> {
  const response = await fetch(`/api/fixed-tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update fixed task");
}

export async function deleteFixedTask(id: string): Promise<void> {
  const response = await fetch(`/api/fixed-tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete fixed task");
}