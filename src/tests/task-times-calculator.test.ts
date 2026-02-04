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
    expect(result[0].time).toEqual(createDate(12, 0));
  });

  test("distributes time evenly for one task", () => {
    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: [],
    });

    expect(result).toHaveLength(2);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(12, 0));
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
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(11, 0));
    expect(result[1].taskName).toBe("Task2");
    expect(result[2].time).toEqual(createDate(12, 0));
    expect(result[2].taskName).toBe("Stopp");
  });

  test("distributes time evenly for four tasks", () => {
    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2", "Task3", "Task4"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: [],
    });

    expect(result).toHaveLength(5);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(10, 30));
    expect(result[1].taskName).toBe("Task2");
    expect(result[2].time).toEqual(createDate(11, 0));
    expect(result[2].taskName).toBe("Task3");
    expect(result[3].time).toEqual(createDate(11, 30));
    expect(result[3].taskName).toBe("Task4");
    expect(result[4].time).toEqual(createDate(12, 0));
    expect(result[4].taskName).toBe("Stopp");
  });

  test("handles three tasks with one fixed task", () => {
    const fixedTasks = [createFixedTask("FixedTask1", 10, 30, 11, 0)];

    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2", "Task3"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: fixedTasks,
    });

    expect(result).toHaveLength(5);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(10, 30));
    expect(result[1].taskName).toBe("FixedTask1");
    expect(result[2].time).toEqual(createDate(11, 0));
    expect(result[2].taskName).toBe("Task2");
    expect(result[3].time).toEqual(createDate(11, 30));
    expect(result[3].taskName).toBe("Task3");
    expect(result[4].time).toEqual(createDate(12, 0));
    expect(result[4].taskName).toBe("Stopp");
  });

  test("handles two tasks with two consecutive fixed tasks", () => {
    const fixedTasks = [
      createFixedTask("FixedTask1", 10, 30, 11, 0),
      createFixedTask("FixedTask2", 11, 0, 11, 30),
    ];

    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: fixedTasks,
    });

    expect(result).toHaveLength(5);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(10, 30));
    expect(result[1].taskName).toBe("FixedTask1");
    expect(result[2].time).toEqual(createDate(11, 0));
    expect(result[2].taskName).toBe("FixedTask2");
    expect(result[3].time).toEqual(createDate(11, 30));
    expect(result[3].taskName).toBe("Task2");
    expect(result[4].time).toEqual(createDate(12, 0));
    expect(result[4].taskName).toBe("Stopp");
  });

  test("handles two fixed tasks at each end", () => {
    const fixedTasks = [
      createFixedTask("FixedTask1", 10, 0, 10, 30),
      createFixedTask("FixedTask2", 11, 30, 12, 0),
    ];

    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: fixedTasks,
    });

    expect(result).toHaveLength(5);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("FixedTask1");
    expect(result[1].time).toEqual(createDate(10, 30));
    expect(result[1].taskName).toBe("Task1");
    expect(result[2].time).toEqual(createDate(11, 0));
    expect(result[2].taskName).toBe("Task2");
    expect(result[3].time).toEqual(createDate(11, 30));
    expect(result[3].taskName).toBe("FixedTask2");
    expect(result[4].time).toEqual(createDate(12, 0));
    expect(result[4].taskName).toBe("Stopp");
  });

  test("handles one fixed task in the middle - task continues after", () => {
    const fixedTasks = [createFixedTask("FixedTask1", 10, 15, 11, 15)];

    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: fixedTasks,
    });

    expect(result).toHaveLength(5);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(10, 15));
    expect(result[1].taskName).toBe("FixedTask1");
    expect(result[2].time).toEqual(createDate(11, 15));
    expect(result[2].taskName).toBe("Task1");
    expect(result[3].time).toEqual(createDate(11, 30));
    expect(result[3].taskName).toBe("Task2");
    expect(result[4].time).toEqual(createDate(12, 0));
    expect(result[4].taskName).toBe("Stopp");
  });

  test("handles one task with two fixed tasks - task continues after", () => {
    const fixedTasks = [
      createFixedTask("FixedTask1", 10, 30, 11, 0),
      createFixedTask("FixedTask2", 11, 0, 11, 30),
    ];

    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: fixedTasks,
    });

    expect(result).toHaveLength(5);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(10, 30));
    expect(result[1].taskName).toBe("FixedTask1");
    expect(result[2].time).toEqual(createDate(11, 0));
    expect(result[2].taskName).toBe("FixedTask2");
    expect(result[3].time).toEqual(createDate(11, 30));
    expect(result[3].taskName).toBe("Task1");
    expect(result[4].time).toEqual(createDate(12, 0));
    expect(result[4].taskName).toBe("Stopp");
  });

  test("ignores fixed task before start time", () => {
    const fixedTasks = [createFixedTask("FixedTask1", 9, 0, 9, 30)];

    const result = calculateTimesForEachTask({
      tasksInRandomOrder: ["Task1", "Task2"],
      startTime: createDate(10, 0),
      stopTime: createDate(12, 0),
      fixedDateTimeTasks: fixedTasks,
    });

    expect(result).toHaveLength(3);
    expect(result[0].time).toEqual(createDate(10, 0));
    expect(result[0].taskName).toBe("Task1");
    expect(result[1].time).toEqual(createDate(11, 0));
    expect(result[1].taskName).toBe("Task2");
    expect(result[2].time).toEqual(createDate(12, 0));
    expect(result[2].taskName).toBe("Stopp");
  });
});