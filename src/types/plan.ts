export interface PlanItem {
  time: Date;
  taskName: string;
}

export interface TimeSettings {
  startTime: Date;
  endTime: Date;
}

export interface CalculationSettings {
  allTasks: boolean;
  shouldBeRandom: boolean;
  numberOfNonRequiredTasks: number;
}