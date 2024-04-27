"use client";

import Tasks from "@/components/tasks";
import { useGlobalState } from "@/context/GlobalContext";

export default function Home() {
  const { tasks } = useGlobalState();
  return <Tasks title="All Tasks" tasks={tasks} />;
}
