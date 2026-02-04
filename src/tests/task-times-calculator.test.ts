import { calculateTimesForEachTask } from "@/services/task-times-calculator";
import { FixedDateTimeTask } from "@/types";

function createDate(hours: number, minutes: number): Date {
  return new Date(2020, 8, 6, hours, minutes, 0);
}

function createFixedTask(
  name: string,
  startHour: number,
  startMinute: number,
  endHour: number,
  endMinute: number
): FixedDateTimeTask {
  return {
    id: crypto.randomUUID(),
    taskName: name,
    startTime: createDate(startHour, startMinute),
    stopTime: createDate(endHour, endMinute),
    deactivated: false,
  };
}

describe("TaskTimesCalculator", () => {
  test("returns only stop time when no tasks", () => {
    const result = calculateTimesForEachTask({
      tasksInRandomOrder: [],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: [],
    });

    expect(result).toHaveLength(1);
    expect(result[0].taskName).toBe("Stopp");
  });

  test("distributes time evenly for one task", () => {
    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: [],
    });

    expect(result).toHaveLength(2);
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].taskName).toBe("Stopp");
  });

  test("distributes time evenly for two tasks", () => {
    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: [],
    });

    expect(result).toHaveLength(3);
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].taskName).toBe("Task2");
    expect(result[1].time.getHours()).toBe(11);
    expect(result[2].taskName).toBe("Stopp");
  });

  test("handles one fixed task in the middle", () => {
    const fixedTasks = [
      createFixedTask("FixedTask1", 10, 30, 11, 0),
    ];

    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2", "Task3"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: fixedTasks,
    });

    expect(result.some(r => r.taskName === "FixedTask1")).toBe(true);
    expect(result[result.length - 1].taskName).toBe("Stopp");
  });
});