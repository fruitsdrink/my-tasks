"use client";

import Tasks from "@/components/tasks";
import { useGlobalState } from "@/context/GlobalContext";

export default function Page() {
  const { importantTasks } = useGlobalState();
  return <Tasks title="Important Tasks" tasks={importantTasks} />;
}
