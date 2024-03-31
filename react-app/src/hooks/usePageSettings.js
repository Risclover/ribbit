import { useContext, useEffect } from "react";
import { PageTitleContext } from "../context";

export function usePageSettings({ documentTitle, icon, pageTitle }) {
  const { setPageTitle, setPageIcon } = useContext(PageTitleContext);

  useEffect(() => {
    document.title = documentTitle;
    setPageIcon(icon);
    setPageTitle(<span className="nav-left-dropdown-item">{pageTitle}</span>);
  }, [documentTitle, setPageTitle, setPageIcon]);
}
