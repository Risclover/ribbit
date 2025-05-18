import { useEffect } from "react";
import { useHistory } from "react-router-dom";

/**
 * Keeps window scroll at the top.
 */

export function useScrollToTop() {
  const history = useHistory();

  useEffect(() => {
    const stopListening = history.listen(() => window.scrollTo(0, 0));
    return stopListening; // cleanup when component unmounts
  }, [history]);
}
