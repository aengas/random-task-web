"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Card, CardTitle, Button } from "@/components/ui";
import { PlanList } from "./plan-list";
import { usePlanStore } from "@/stores/plan-store";

export function PlanSection() {
  const planItems = usePlanStore((state) => state.planItems);
  const clearPlan = usePlanStore((state) => state.clearPlan);
  const [isClearing, setIsClearing] = useState(false);

  async function handleClearPlan() {
    if (!confirm("Er du sikker på at du vil slette planen?")) return;
    
    setIsClearing(true);
    await clearPlan();
    setIsClearing(false);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <CardTitle>📋 Plan</CardTitle>
        {planItems.length > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleClearPlan}
            disabled={isClearing}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {isClearing ? "Sletter..." : "Slett plan"}
          </Button>
        )}
      </div>
      {planItems.length === 0 ? <EmptyPlanMessage /> : <PlanList items={planItems} />}
    </Card>
  );
}

function EmptyPlanMessage() {
  return (
    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
      <p className="text-lg">Ingen plan generert ennå</p>
      <p className="text-sm mt-1">Legg til oppgaver og generer en plan</p>
    </div>
  );
}