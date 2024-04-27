"use client";

import Tasks from "@/components/tasks";
import { useGlobalState } from "@/context/GlobalContext";

export default function Page() {
  const { incompleteTasks } = useGlobalState();
  return <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
}
