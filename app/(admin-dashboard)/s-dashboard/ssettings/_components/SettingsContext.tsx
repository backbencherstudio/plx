"use client";
import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

type SubmitHandler = () => Promise<void> | void;

type SettingsContextType = {
  isDirty: boolean;
  setDirty: (dirty: boolean) => void;
  registerSubmit: (handler: SubmitHandler) => void;
  triggerSave: () => Promise<void>;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [isDirty, setIsDirty] = useState(false);
  const submitRef = useRef<SubmitHandler | null>(null);

  const registerSubmit = useCallback((handler: SubmitHandler) => {
    submitRef.current = handler;
  }, []);

  const triggerSave = useCallback(async () => {
    if (submitRef.current) {
      await submitRef.current();
      setIsDirty(false);
    }
  }, []);

  const value = useMemo(
    () => ({ isDirty, setDirty: setIsDirty, registerSubmit, triggerSave }),
    [isDirty, registerSubmit, triggerSave]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettingsContext(): SettingsContextType {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettingsContext must be used within SettingsProvider");
  return ctx;
}

