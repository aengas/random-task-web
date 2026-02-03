import { RandomTask, FixedDateTimeTask, PlanItem } from "@/types";
import { calculateTimesForEachTask } from "./task-times-calculator";

interface GenerateInput {
  tasks: RandomTask[];
  fixedTasks: FixedDateTimeTask[];
  startTime: Date;
  stopTime: Date;
  allTasks: boolean;
  shouldBeRandom: boolean;
  numberOfNonRequiredTasks: number;
}

export function generatePlan(input: GenerateInput): PlanItem[] {
  const selectedTasks = selectTasks(input);
  const shuffledTasks = shuffleArray(selectedTasks);

  return calculateTimesForEachTask({
    tasksInRandomOrder: shuffledTasks,
    startTime: input.startTime,
    stopTime: input.stopTime,
    fixedDateTimeTasks: input.fixedTasks,
  });
}

function selectTasks(input: GenerateInput): string[] {
  const activeTasks = input.tasks.filter((t) => !t.deactivated);

  if (input.allTasks) {
    return activeTasks.map((t) => t.description);
  }

  const requiredTasks = activeTasks
    .filter((t) => t.required)
    .map((t) => t.description);

  const nonRequiredTasks = activeTasks.filter((t) => !t.required);
  const numberOfNonRequired = getNumberOfNonRequiredTasks(
    input.shouldBeRandom,
    input.numberOfNonRequiredTasks,
    nonRequiredTasks.length
  );

  const selectedNonRequired = selectRandomItems(
    nonRequiredTasks.map((t) => t.description),
    numberOfNonRequired
  );

  return [...requiredTasks, ...selectedNonRequired];
}

function getNumberOfNonRequiredTasks(
  shouldBeRandom: boolean,
  numberOfNonRequired: number,
  maxCount: number
): number {
  if (shouldBeRandom) {
    return Math.floor(Math.random() * (maxCount + 1));
  }
  return Math.min(numberOfNonRequired, maxCount);
}

function selectRandomItems<T>(items: T[], count: number): T[] {
  const shuffled = shuffleArray([...items]);
  return shuffled.slice(0, count);
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}