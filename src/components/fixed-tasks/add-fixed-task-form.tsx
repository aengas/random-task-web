"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Input, TimeInput } from "@/components/ui";
import { useFixedTaskStore } from "@/stores/fixed-task-store";
import { getTimeString, parseTimeString } from "@/lib/time-utils";

export function AddFixedTaskForm() {
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState(() => getTimeString(new Date()));
  const [endTime, setEndTime] = useState(() =>
    getTimeString(new Date(Date.now() + 30 * 60 * 1000))
  );
  const addFixedTask = useFixedTaskStore((state) => state.addFixedTask);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!taskName.trim()) return;

    addFixedTask({
      taskName: taskName.trim(),
      startTime: parseTimeString(startTime),
      stopTime: parseTimeString(endTime),
    });

    setTaskName("");
  }

  const isValid = taskName.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="sm:col-span-2 lg:col-span-1">
          <Input
            id="fixed-task-name"
            label="Beskrivelse"
            placeholder="F.eks. Lunsj"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
        </div>
        <TimeInput
          id="fixed-start-time"
          label="Starttid"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <TimeInput
          id="fixed-end-time"
          label="Sluttid"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <div className="flex items-end">
          <Button type="submit" disabled={!isValid} className="w-full">
            <Plus className="w-4 h-4 mr-1" />
            Legg til
          </Button>
        </div>
      </div>
    </form>
  );
}