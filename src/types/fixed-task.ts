export interface FixedDateTimeTask {
  id: string;
  taskName: string;
  startTime: Date;
  stopTime: Date;
  deactivated: boolean;
}

export interface CreateFixedTaskInput {
  taskName: string;
  startTime: Date;
  stopTime: Date;
}

export function createFixedTask(input: CreateFixedTaskInput): FixedDateTimeTask {
  return {
    id: generateId(),
    taskName: input.taskName,
    startTime: input.startTime,
    stopTime: input.stopTime,
    deactivated: false,
  };
}

export function getFixedTaskDuration(task: FixedDateTimeTask): number {
  return task.stopTime.getTime() - task.startTime.getTime();
}

function generateId(): string {
  return crypto.randomUUID();
}