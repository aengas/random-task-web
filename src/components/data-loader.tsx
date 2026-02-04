"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTaskStore, useFixedTaskStore, usePlanStore } from "@/stores";

interface DataLoaderProps {
  children: React.ReactNode;
}

export function DataLoader({ children }: DataLoaderProps) {
  const { data: session } = useSession();
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const fetchFixedTasks = useFixedTaskStore((state) => state.fetchFixedTasks);
  const fetchPlan = usePlanStore((state) => state.fetchPlan);

  useEffect(() => {
    if (session?.user) {
      fetchTasks();
      fetchFixedTasks();
      fetchPlan();
    }
  }, [session, fetchTasks, fetchFixedTasks, fetchPlan]);

  return <>{children}</>;
}