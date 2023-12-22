import React, { useContext } from "react";

const SearchQueryContext = React.createContext();

export function SearchQueryProvider({ children }) {
  const [query, setQuery] = useState("");

  return (
    <SearchQueryContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchQueryContext.Provider>
  );
}

export function Search({ children, value }) {
  const searchQuery = useContext(SearchQueryContext);
}
