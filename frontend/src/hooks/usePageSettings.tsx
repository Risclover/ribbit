import { useEffect, ReactNode, useMemo } from "react";
import { usePageTitle } from "@/context/PageTitleContext";

interface Params {
  documentTitle?: string; // <title> tag
  icon?: ReactNode | null; // little icon in the nav bar
  pageTitle?: ReactNode | null; // visible page title
}

/** Keep <title>, nav-bar icon and nav-bar title in sync. */
export function usePageSettings({
  documentTitle,
  icon = null,
  pageTitle = null,
}: Params): void {
  const { setPageIcon, setPageTitle } = usePageTitle();

  const memoIcon = useMemo(() => icon, []); // icon almost never changes
  const memoTitle = useMemo(
    () =>
      pageTitle ? (
        <span className="nav-left-dropdown-item">{pageTitle}</span>
      ) : null,
    [] // same here
  );

  useEffect(() => {
    document.title = documentTitle ?? "Ribbit – Splash into anything";
    setPageIcon(memoIcon);
    setPageTitle(memoTitle);

    return () => {
      setPageIcon(null);
      setPageTitle(null);
    };
    // deps: only things that are actually allowed to change
  }, [documentTitle, memoIcon, memoTitle, setPageIcon, setPageTitle]);
}
