import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  FC,
  useContext,
} from "react";

/* ─────────────────── Types ─────────────────── */

export interface PageTitleContextType {
  /** Element shown in the nav bar (can be null) */
  pageTitle: ReactNode | null;
  setPageTitle: Dispatch<SetStateAction<ReactNode | null>>;

  /** Small icon element shown next to the title (can be null) */
  pageIcon: ReactNode | null;
  setPageIcon: Dispatch<SetStateAction<ReactNode | null>>;
}

interface ProviderProps {
  children: ReactNode;
}

/* ─────────────────── Context ───────────────── */

export const PageTitleContext = createContext<PageTitleContextType | undefined>(
  undefined
);

/* ─────────────────── Provider ───────────────── */

export const PageTitleProvider: FC<ProviderProps> = ({ children }) => {
  const [pageTitle, setPageTitle] = useState<ReactNode | null>(null);
  const [pageIcon, setPageIcon] = useState<ReactNode | null>(null);

  const value: PageTitleContextType = {
    pageTitle,
    setPageTitle,
    pageIcon,
    setPageIcon,
  };

  return (
    <PageTitleContext.Provider value={value}>
      {children}
    </PageTitleContext.Provider>
  );
};

/* ─────────────── Convenience hook ───────────── */

export function usePageTitle(): PageTitleContextType {
  const ctx = useContext(PageTitleContext);

  if (!ctx) {
    throw new Error("usePageTitle must be used within a PageTitleProvider");
  }
  return ctx;
}
