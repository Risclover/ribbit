import { useEffect, ReactNode, useMemo } from "react";
import { usePageTitle } from "@/context/PageTitleContext";

interface Params {
  documentTitle?: string; // <title> tag
  icon?: ReactNode | null; // little icon in the nav bar
  pageTitle?: ReactNode | null; // visible page title
  /** change this when you want icon/title to refresh (e.g., community.id) */
  refreshKey?: unknown;
}

/** Keep <title>, nav-bar icon and nav-bar title in sync (without render loops). */
export function usePageSettings({
  documentTitle,
  icon = null,
  pageTitle = null,
  refreshKey,
}: Params): void {
  const { setPageIcon, setPageTitle } = usePageTitle();

  // Only rebuild these nodes when refreshKey changes (not every render)
  const memoIcon = useMemo(() => icon, [refreshKey]);
  const memoTitle = useMemo(
    () =>
      pageTitle ? (
        <span className="nav-left-dropdown-item">{pageTitle}</span>
      ) : null,
    [
      refreshKey,
      pageTitle && typeof pageTitle === "string" ? pageTitle : undefined,
    ]
  );

  // <title> can update freely (primitive string)
  useEffect(() => {
    document.title = documentTitle ?? "Ribbit – Splash into anything";
  }, [documentTitle]);

  // Set/clear icon when its memoized value actually changes
  useEffect(() => {
    setPageIcon(memoIcon);
    return () => setPageIcon(null);
  }, [memoIcon, setPageIcon]);

  // Set/clear title when its memoized value actually changes
  useEffect(() => {
    setPageTitle(memoTitle);
    return () => setPageTitle(null);
  }, [memoTitle, setPageTitle]);
}
