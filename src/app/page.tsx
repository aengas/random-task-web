import { Header } from "@/components/header";
import { Card, CardTitle} from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <Header />

      <div className="space-y-6">
        <TimeSettingsSection />
        <TasksSection />
        <FixedTasksSection />
        <PlanSection />
      </div>
    </>
  )
}

function TimeSettingsSection() {
  return (
    <Card>
      <CardTitle>Tidsinnstillinger</CardTitle>
      <p className="text-gray-500 mt-2">Kommer snart...</p>
    </Card>
  );
}

function TasksSection() {
  return (
    <Card>
      <CardTitle>Oppgaver</CardTitle>
      <p className="text-gray-500 mt-2">Kommer snart...</p>
    </Card>
  )
}

function FixedTasksSection() {
  return (
    <Card>
      <CardTitle>Faste tider</CardTitle>
      <p className="text-gray-500 mt-2">Kommer snart...</p>
    </Card>
  );
}

function PlanSection() {
  return (
    <Card>
      <CardTitle>📋 Plan</CardTitle>
      <p className="text-gray-500 mt-2">Trykk &quot;Beregn&quot; for å generere en plan</p>
    </Card>
  );
}