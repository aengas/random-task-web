"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button, Input, Checkbox } from "@/components/ui";
import { useTaskStore } from "@/stores/task-store";

export function AddTaskForm() {
    const [description, setDescription] = useState("");
    const [required, setRequired] = useState(false);
    const addTask = useTaskStore((state) => state.addTask);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!description.trim()) return;

        addTask({ description: description.trim(), required });
        resetForm();
    }

    function resetForm() {
    setDescription("");
    setRequired(false);
  }

    const isValid = description.trim().length > 0;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
                <Input 
                  id="new-task"
                  label="Ny oppgave"
                  placeholder="Skriv inn oppgavebeskrivelse..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-4">
                <Checkbox 
                  id="required-task"
                  label="Påkrevd"
                  checked={required}
                  onChange={(e) => setRequired(e.target.checked)}/>
                <Button type="submit" disabled={!isValid} size="md">
                    <Plus className="w-4 h-4 mr-1">
                        Legg til
                    </Plus>
                </Button>
            </div>
        </form>
    )
}