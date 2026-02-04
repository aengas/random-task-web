"use client";

import { useState } from "react";
import { Card, CardTitle, TimeInput, Checkbox, Input, Button } from "@/components/ui";
import { useSettingsStore, useTaskStore, useFixedTaskStore, usePlanStore } from "@/stores";
import { generatePlan } from "@/services";
import { parseTimeString } from "@/lib/time-utils";
import { Calculator, Check } from "lucide-react";

export function TimeSettingsSection() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const settings = useSettingsStore();
  const tasks = useTaskStore((state) => state.tasks);
  const fixedTasks = useFixedTaskStore((state) => state.fixedTasks);
  const setPlanItems = usePlanStore((state) => state.setPlanItems);

  async function handleCalculate() {
    setIsCalculating(true);
    setShowSuccess(false);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const planItems = generatePlan({
      tasks,
      fixedTasks,
      startTime: parseTimeString(settings.startTime),
      stopTime: parseTimeString(settings.endTime),
      allTasks: settings.allTasks,
      shouldBeRandom: settings.shouldBeRandom,
      numberOfNonRequiredTasks: settings.numberOfNonRequiredTasks,
    });
    setPlanItems(planItems);

    setIsCalculating(false);
    setShowSuccess(true);

    setTimeout(() => {
      const planElement = document.getElementById("generated-plan");
      if (planElement) {
        planElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);

    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  }

  return (
    <Card>
      <CardTitle>⏰ Tidsinnstillinger</CardTitle>
      <div className="mt-4 space-y-4">
        <TimeSettings
          startTime={settings.startTime}
          endTime={settings.endTime}
          onStartTimeChange={settings.setStartTime}
          onEndTimeChange={settings.setEndTime}
        />
        <TaskSettings
          allTasks={settings.allTasks}
          shouldBeRandom={settings.shouldBeRandom}
          numberOfNonRequiredTasks={settings.numberOfNonRequiredTasks}
          onAllTasksChange={settings.setAllTasks}
          onShouldBeRandomChange={settings.setShouldBeRandom}
          onNumberOfNonRequiredChange={settings.setNumberOfNonRequiredTasks}
        />
        <Button
          onClick={handleCalculate}
          size="lg"
          className={`w-full sm:w-auto transition-all duration-200 active:scale-95 ${
            showSuccess
              ? "bg-green-600 hover:bg-green-700"
              : ""
          }`}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <>
              <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Beregner...
            </>
          ) : showSuccess ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Plan beregnet!
            </>
          ) : (
            <>
              <Calculator className="w-4 h-4 mr-2" />
              Beregn plan
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

interface TimeSettingsProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

function TimeSettings({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: TimeSettingsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <TimeInput
        id="start-time"
        label="Starttid"
        value={startTime}
        onChange={(e) => onStartTimeChange(e.target.value)}
      />
      <TimeInput
        id="end-time"
        label="Sluttid"
        value={endTime}
        onChange={(e) => onEndTimeChange(e.target.value)}
      />
    </div>
  );
}

interface TaskSettingsProps {
  allTasks: boolean;
  shouldBeRandom: boolean;
  numberOfNonRequiredTasks: number;
  onAllTasksChange: (value: boolean) => void;
  onShouldBeRandomChange: (value: boolean) => void;
  onNumberOfNonRequiredChange: (count: number) => void;
}

function TaskSettings({
  allTasks,
  shouldBeRandom,
  numberOfNonRequiredTasks,
  onAllTasksChange,
  onShouldBeRandomChange,
  onNumberOfNonRequiredChange,
}: TaskSettingsProps) {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <Checkbox
        id="all-tasks"
        label="Alle oppgaver"
        checked={allTasks}
        onChange={(e) => onAllTasksChange(e.target.checked)}
      />
      <Checkbox
        id="should-be-random"
        label="Tilfeldig antall"
        checked={shouldBeRandom}
        onChange={(e) => onShouldBeRandomChange(e.target.checked)}
      />
      <div className="w-32">
        <Input
          id="non-required-count"
          label="Antall ikke-påkrevde"
          type="number"
          min={0}
          value={numberOfNonRequiredTasks}
          onChange={(e) => onNumberOfNonRequiredChange(parseInt(e.target.value) || 0)}
          disabled={shouldBeRandom}
        />
      </div>
    </div>
  );
}