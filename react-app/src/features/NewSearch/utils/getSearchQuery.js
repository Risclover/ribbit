import { useQuery } from "../hooks/useQuery";

export function getSearchQuery() {
  const query = useQuery();
  return query.get("q");
}
