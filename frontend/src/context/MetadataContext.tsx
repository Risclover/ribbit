import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";

const MetadataContext = createContext();

export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({});

  /**
   * Stable reference.  The function never changes because we don’t
   * capture any outside variables; we rely on the functional form of
   * setMetadata to read the latest state.
   */
  const fetchMetadata = useCallback((url) => {
    setMetadata((prev) => {
      if (prev[url]) return prev; // already fetched → no network call

      // Start the fetch; when it finishes, update state again.
      fetch("https://api.linkpreview.net", {
        method: "POST",
        headers: {
          "X-Linkpreview-Api-Key": process.env.REACT_APP_LINK_PREVIEW_KEY,
        },
        mode: "cors",
        body: JSON.stringify({ q: url }),
      })
        .then((res) => res.json())
        .then((data) => {
          // Use functional update again to ensure we’re merging into
          // the latest state, even if other URLs completed meanwhile.
          setMetadata((p) => ({ ...p, [url]: data.image }));
        });

      return prev; // nothing to change *yet*
    });
  }, []);

  // Memo‑ise context value so consumers don’t re‑render on every setState.
  const value = useMemo(
    () => ({ metadata, fetchMetadata }),
    [metadata, fetchMetadata]
  );

  return (
    <MetadataContext.Provider value={value}>
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => useContext(MetadataContext);
