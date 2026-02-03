"use client";

import { Card, CardTitle } from "@/components/ui";
import { usePlanStore } from "@/stores";
import { PlanList } from "./plan-list";

export function PlanSection() {
  const planItems = usePlanStore((state) => state.planItems);

  return (
    <Card>
      <CardTitle>📋 Plan</CardTitle>
      <div className="mt-4">
        {planItems.length === 0 ? (
          <EmptyPlanMessage />
        ) : (
          <PlanList items={planItems} />
        )}
      </div>
    </Card>
  );
}

function EmptyPlanMessage() {
  return (
    <div className="text-center py-8 text-gray-500">
      <p>Ingen plan generert ennå.</p>
      <p className="text-sm mt-1">Trykk &quot;Beregn plan&quot; for å lage en plan.</p>
    </div>
  );
}