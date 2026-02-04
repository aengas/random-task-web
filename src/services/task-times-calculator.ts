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
  let remainingTimeForCurrentTask = timePerTask;

  while (randomTaskIndex < tasksInRandomOrder.length || fixedTaskIndex < activeFixedTasks.length) {
    const nextFixedTask = fixedTaskIndex < activeFixedTasks.length ? activeFixedTasks[fixedTaskIndex] : null;
    
    if (nextFixedTask && currentTime.getTime() >= nextFixedTask.startTime.getTime()) {
      planItems.push({
        time: new Date(nextFixedTask.startTime),
        taskName: nextFixedTask.taskName,
      });
      currentTime = new Date(nextFixedTask.stopTime);
      fixedTaskIndex++;
    } else if (randomTaskIndex < tasksInRandomOrder.length) {
      const taskStartTime = new Date(currentTime);
      planItems.push({
        time: taskStartTime,
        taskName: tasksInRandomOrder[randomTaskIndex],
      });
      
      const taskEndTime = new Date(currentTime.getTime() + remainingTimeForCurrentTask);
      
      if (nextFixedTask && taskEndTime.getTime() > nextFixedTask.startTime.getTime()) {
        currentTime = new Date(nextFixedTask.startTime);
        const usedTime = nextFixedTask.startTime.getTime() - taskStartTime.getTime();
        remainingTimeForCurrentTask = remainingTimeForCurrentTask - usedTime;
      } else {
        currentTime = taskEndTime;
        randomTaskIndex++;
        remainingTimeForCurrentTask = timePerTask;
      }
    } else {
      break;
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