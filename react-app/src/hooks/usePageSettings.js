import { useContext, useEffect } from "react";
import { PageTitleContext } from "../context";

export function usePageSettings({
  documentTitle,
  iconSrc,
  iconAlt,
  pageTitleContent,
}) {
  const { setPageTitle, setPageIcon } = useContext(PageTitleContext);

  useEffect(() => {
    document.title = documentTitle;
    setPageIcon(
      <img
        src={iconSrc}
        className="nav-left-dropdown-item-icon"
        alt={iconAlt}
      />
    );
    setPageTitle(
      <span className="nav-left-dropdown-item">{pageTitleContent}</span>
    );
  }, [documentTitle, setPageTitle, setPageIcon]);
}
