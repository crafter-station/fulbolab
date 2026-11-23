"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const OBS_ROUTES = ["/pe/playoffs"];

interface ObsState {
  obsMode: boolean;
  obsAvailable: boolean;
  setObsMode: (value: boolean) => void;
}

const ObsContext = createContext<ObsState>({
  obsMode: false,
  obsAvailable: false,
  setObsMode: () => {},
});

export function useObs() {
  return useContext(ObsContext);
}

export function ObsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [requested, setRequested] = useState(false);
  const obsAvailable = OBS_ROUTES.includes(pathname);
  const obsMode = obsAvailable && requested;

  useEffect(() => {
    if (!obsMode) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented)
        setRequested(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [obsMode]);

  const value = useMemo<ObsState>(
    () => ({ obsMode, obsAvailable, setObsMode: setRequested }),
    [obsMode, obsAvailable],
  );

  return <ObsContext.Provider value={value}>{children}</ObsContext.Provider>;
}

export function HideInObs({ children }: { children: ReactNode }) {
  const { obsMode } = useObs();
  if (obsMode) return null;
  return children;
}
