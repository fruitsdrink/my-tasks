"use client";

import Tasks from "@/components/tasks";
import { useGlobalState } from "@/context/GlobalContext";

export default function Page() {
  const { completedTasks } = useGlobalState();
  return <Tasks title="Completed Tasks" tasks={completedTasks} />;
}
