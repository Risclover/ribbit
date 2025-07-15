import { createContext, useRef, ReactNode, RefObject } from "react";

interface ScrollContextValue {
  targetRef: RefObject<HTMLDivElement>;
  scrollToTarget: () => void;
}

export const ScrollContext = createContext<ScrollContextValue | undefined>(
  undefined
);

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ScrollContext.Provider value={{ targetRef, scrollToTarget }}>
      {children}
    </ScrollContext.Provider>
  );
};
