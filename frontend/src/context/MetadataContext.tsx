import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  ReactNode,
} from "react";

/** Map from URL → thumbnail image URL (or `undefined` while loading) */
export type MetadataMap = Record<string, string | undefined>;

export interface MetadataContextType {
  metadata: MetadataMap;
  fetchMetadata: (url: string) => void;
}

interface MetadataProviderProps {
  children: ReactNode;
}

const MetadataContext = createContext<MetadataContextType | undefined>(
  undefined
);

export const MetadataProvider = ({ children }: MetadataProviderProps) => {
  const [metadata, setMetadata] = useState<MetadataMap>({});

  /**
   * Fetch link-preview metadata for a given URL (idempotent).
   * Uses a functional `setMetadata` update so the callback itself
   * never changes → safe to memo-ise.
   */
  const fetchMetadata = useCallback((url: string) => {
    setMetadata((prev) => {
      if (prev[url]) return prev; // already cached

      fetch("https://api.linkpreview.net", {
        method: "POST",
        headers: {
          "X-Linkpreview-Api-Key": process.env.REACT_APP_LINK_PREVIEW_KEY ?? "",
        },
        mode: "cors",
        body: JSON.stringify({ q: url }),
      })
        .then((res) => res.json())
        .then((data: { image?: string }) => {
          setMetadata((p) => ({ ...p, [url]: data.image }));
        })
        .catch(() => {
          /* ignore network errors for now */
        });

      return prev; // no immediate change
    });
  }, []);

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

export const useMetadata = (): MetadataContextType => {
  const ctx = useContext(MetadataContext);
  if (!ctx) {
    throw new Error("useMetadata must be used within a MetadataProvider");
  }
  return ctx;
};
