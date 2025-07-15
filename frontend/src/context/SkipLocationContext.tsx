import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface SkipLocationContextValue {
  showLinks: boolean;
  setShowLinks: Dispatch<SetStateAction<boolean>>;
}

export const SkipLocationContext = createContext<
  SkipLocationContextValue | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const SkipLocationProvider = ({ children }: ProviderProps) => {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <SkipLocationContext.Provider value={{ showLinks, setShowLinks }}>
      {children}
    </SkipLocationContext.Provider>
  );
};

export const useSkipLocation = () => {
  const ctx = useContext(SkipLocationContext);
  if (!ctx) {
    throw new Error("useSkipLocation must be used within SkipLocationProvider");
  }
  return ctx;
};
