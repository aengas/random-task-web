import { Header } from "@/components/header";
import { DataLoader } from "@/components/data-loader";
import { SunTimes } from "@/components/sun-times";
import { TimeSettingsSection } from "@/components/time-settings-section";
import { TasksSection } from "@/components/tasks";
import { FixedTasksSection } from "@/components/fixed-tasks";
import { PlanSection } from "@/components/plan";

export default function HomePage() {
  return (
    <DataLoader>
      <Header />
      
      <div className="space-y-6">
        <SunTimes />
        <TimeSettingsSection />
        <TasksSection />
        <FixedTasksSection />
        <PlanSection />
      </div>
    </DataLoader>
  );
}