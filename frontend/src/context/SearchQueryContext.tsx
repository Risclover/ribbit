import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SearchQueryContextValue {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const SearchQueryContext = createContext<SearchQueryContextValue | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

export function SearchQueryProvider({ children }: ProviderProps) {
  const [query, setQuery] = useState("");

  return (
    <SearchQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

interface SearchProps {
  children?: ReactNode;
  value?: unknown;
}

export function Search({ children, value }: SearchProps) {
  const searchQuery = useContext(SearchQueryContext);
  return null;
}
