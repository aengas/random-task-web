import { FixedDateTimeTask, PlanItem } from "@/types";

interface CalculateInput {
  tasksInRandomOrder: string[];
  startTime: Date;
  stopTime: Date;
  fixedDateTimeTasks: FixedDateTimeTask[];
}

export function calculateTimesForEachTask(input: CalculateInput): PlanItem[] {
  const { tasksInRandomOrder, startTime, stopTime, fixedDateTimeTasks } = input;
  
  const activeFixedTasks = filterActiveFixedTasks(fixedDateTimeTasks, startTime);
  const planItems: PlanItem[] = [];

  if (tasksInRandomOrder.length === 0) {
    return [{ time: stopTime, taskName: "Stopp" }];
  }

  const timePerTask = calculateTimePerNonFixedTask(
    tasksInRandomOrder.length,
    startTime,
    stopTime,
    activeFixedTasks
  );

  let currentTime = new Date(startTime);
  let fixedTaskIndex = 0;
  let randomTaskIndex = 0;

  for (let i = 0; i < tasksInRandomOrder.length + activeFixedTasks.length; i++) {
    if (shouldAddRandomTask(fixedTaskIndex, activeFixedTasks, currentTime)) {
      planItems.push({
        time: new Date(currentTime),
        taskName: tasksInRandomOrder[randomTaskIndex],
      });
      currentTime = new Date(currentTime.getTime() + timePerTask);
      randomTaskIndex++;
    } else {
      const fixedTask = activeFixedTasks[fixedTaskIndex];
      planItems.push({
        time: new Date(fixedTask.startTime),
        taskName: fixedTask.taskName,
      });

      if (shouldContinuePreviousTask(randomTaskIndex, fixedTask, activeFixedTasks, fixedTaskIndex)) {
        planItems.push({
          time: new Date(fixedTask.stopTime),
          taskName: tasksInRandomOrder[randomTaskIndex - 1],
        });
      }

      currentTime = new Date(fixedTask.stopTime);
      fixedTaskIndex++;
    }
  }

  planItems.push({ time: stopTime, taskName: "Stopp" });

  return planItems;
}

function filterActiveFixedTasks(
  tasks: FixedDateTimeTask[],
  startTime: Date
): FixedDateTimeTask[] {
  return tasks
    .filter((t) => !t.deactivated && t.stopTime > startTime)
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
}

function calculateTimePerNonFixedTask(
  taskCount: number,
  startTime: Date,
  stopTime: Date,
  fixedTasks: FixedDateTimeTask[]
): number {
  const totalTime = stopTime.getTime() - startTime.getTime();
  const fixedTasksTime = fixedTasks.reduce(
    (sum, task) => sum + (task.stopTime.getTime() - task.startTime.getTime()),
    0
  );
  const availableTime = totalTime - fixedTasksTime;
  return Math.floor(availableTime / taskCount);
}

function shouldAddRandomTask(
  fixedTaskIndex: number,
  fixedTasks: FixedDateTimeTask[],
  currentTime: Date
): boolean {
  if (fixedTaskIndex >= fixedTasks.length) return true;
  return currentTime < fixedTasks[fixedTaskIndex].startTime;
}

function shouldContinuePreviousTask(
  randomTaskIndex: number,
  currentFixedTask: FixedDateTimeTask,
  fixedTasks: FixedDateTimeTask[],
  fixedTaskIndex: number
): boolean {
  if (randomTaskIndex === 0) return false;
  
  const hasNextFixedTask = fixedTaskIndex + 1 < fixedTasks.length;
  if (!hasNextFixedTask) return true;
  
  const nextFixedTask = fixedTasks[fixedTaskIndex + 1];
  return nextFixedTask.startTime.getTime() !== currentFixedTask.stopTime.getTime();
}