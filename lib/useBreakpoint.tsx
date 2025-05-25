"use client";
import { useEffect, useState, createContext, useContext } from "react";

type Breakpoints = Record<keyof typeof queries, boolean>;
const defaultValue: Breakpoints = {
  sm: false,
  md: false,
  lg: false,
  xl: false,
  "2xl": false,
};
const queries = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

const BreakpointContext = createContext<Breakpoints>(defaultValue);

export const BreakpointProvider = ({ children }: React.PropsWithChildren) => {
  const [breakpoints, setBreakpoint] = useState<Breakpoints>(defaultValue);
  useEffect(() => {
    const mediaQueryLists = Object.entries(queries).map(([key, query]) => [
      key,
      window.matchMedia(query),
    ]);

    const updateBreakpoints = () => {
      setBreakpoint(
        Object.fromEntries(
          mediaQueryLists.map(([key, mql]) => [
            key,
            (mql as MediaQueryList).matches,
          ])
        ) as Breakpoints
      );
    };

    updateBreakpoints();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mediaQueryLists.forEach(([_item, mql]) =>
      (mql as MediaQueryList).addEventListener("change", updateBreakpoints)
    );
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mediaQueryLists.forEach(([_item, mql]) =>
        (mql as MediaQueryList).removeEventListener("change", updateBreakpoints)
      );
    };
  }, []);
  return (
    <BreakpointContext.Provider value={breakpoints}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoint = () => useContext(BreakpointContext);
