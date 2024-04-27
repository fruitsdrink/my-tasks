"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import themes from "./theme";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const GlobalContext = createContext<{
  theme: Record<string, any>;
  tasks: any[];
  isLoading: boolean;
  allTasks: () => void;
  deleteTask: (id: string) => void;
  updateTask: (task: any) => void;
  openModal: () => void;
  closeModal: () => void;
  completedTasks: any[];
  importantTasks: any[];
  incompleteTasks: any[];
  modal: boolean;
  collapsed: boolean;
  collapseMenu: () => void;
}>({
  theme: {},
  tasks: [],
  isLoading: false,
  allTasks: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  openModal: () => {},
  closeModal: () => {},
  collapseMenu: () => {},
  completedTasks: [],
  incompleteTasks: [],
  importantTasks: [],
  modal: false,
  collapsed: false,
});
const GlobalUpdateContext = createContext({});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectTheme, setSelectedTheme] = useState(0);
  const theme = themes[selectTheme];
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([] as any[]);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const allTasks = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/tasks");
      // console.log("get tasks: ", { res });
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        const sorted = res.data.sort((a, b) => {
          return (
            new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
          );
        });
        console.log(sorted);
        setTasks(sorted);
      }
    } catch (error) {
      // toast.error("Failed to fetch tasks");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`/api/tasks/${id}`);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        toast.success("Task deleted");
        await allTasks();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (task: any) => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks`, task);
      toast.success("Task updated");
      await allTasks();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    } finally {
      setIsLoading(false);
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);
  const importantTasks = tasks.filter((task) => task.isImportant);

  useEffect(() => {
    if (user) {
      allTasks();
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        isLoading,
        completedTasks,
        incompleteTasks,
        importantTasks,
        modal,
        collapsed,
        allTasks,
        deleteTask,
        updateTask,
        openModal,
        closeModal,
        collapseMenu,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
