"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { GlobalProvider } from "@/context/GlobalContext";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 200);
  }, []);

  if (!isReady) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
}
