"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTaskStore, useFixedTaskStore } from "@/stores";

interface DataLoaderProps {
  children: React.ReactNode;
}

export function DataLoader({ children }: DataLoaderProps) {
  const { data: session } = useSession();
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const fetchFixedTasks = useFixedTaskStore((state) => state.fetchFixedTasks);

  useEffect(() => {
    if (session?.user) {
      fetchTasks();
      fetchFixedTasks();
    }
  }, [session, fetchTasks, fetchFixedTasks]);

  return <>{children}</>;
}