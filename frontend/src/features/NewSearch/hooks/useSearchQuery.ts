// component / another hook
import { useLocation } from "react-router-dom";

export const useSearchQuery = () => {
  const { search } = useLocation();
  return getSearchQuery(new URLSearchParams(search));
};

// helper – no Hooks inside
export const getSearchQuery = (searchParams: URLSearchParams) =>
  searchParams.get("q")?.trim();
