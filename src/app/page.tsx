import { Header } from "@/components/header";
import { TimeSettingsSection } from "@/components/time-settings-section";
import { TasksSection } from "@/components/tasks";
import { FixedTasksSection } from "@/components/fixed-tasks";
import { PlanSection } from "@/components/plan";

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
  );
}