import { useEffect, ReactNode, useMemo } from "react";
import { usePageTitle } from "@/context/PageTitleContext";

interface Params {
  documentTitle?: string;
  icon?: ReactNode | null;
  pageTitle?: ReactNode | null;
}

export function usePageSettings({
  documentTitle,
  icon = null,
  pageTitle = null,
}: Params): void {
  const { setPageIcon, setPageTitle } = usePageTitle();

  // Wrap pageTitle in the span structure - recompute when pageTitle changes
  const wrappedTitle = useMemo(
    () =>
      pageTitle ? (
        <span className="nav-left-dropdown-item">{pageTitle}</span>
      ) : null,
    [pageTitle]
  );

  // Update <title> whenever documentTitle changes
  useEffect(() => {
    document.title = documentTitle ?? "Ribbit – Splash into anything";
  }, [documentTitle]);

  // Update nav icon whenever icon changes
  useEffect(() => {
    setPageIcon(icon ?? null);
    return () => setPageIcon(null);
  }, [icon, setPageIcon]);

  // Update nav title whenever wrappedTitle changes
  useEffect(() => {
    setPageTitle(wrappedTitle);
    return () => setPageTitle(null);
  }, [wrappedTitle, setPageTitle]);
}
