import { useMemo } from "react";
import { useIsMobile, useIsSmallScreen } from "@/hooks";
import "./SkipLocation.css";

interface SkipLocationProps {
  showNavSidebar: boolean;
  /** Breakpoint below which skip-links are hidden (default 768 px). */
  minWidth?: number;
}

export function SkipLocation({
  showNavSidebar,
  minWidth = 768,
}: SkipLocationProps): JSX.Element | null {
  /* screen-size flags – update only on resize / media-query change */
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen(minWidth);

  /* derived value memo-ised so the component only re-renders
     when one of the dependencies actually changes */
  const hidden = useMemo(() => isMobile || isSmall, [isMobile, isSmall]);

  if (hidden) return null;

  return (
    <div className="skip-location" aria-label="Skip links">
      {showNavSidebar && (
        <a className="skip-link sr-only" href="#side-navigation">
          Skip&nbsp;to&nbsp;Navigation
        </a>
      )}
      <a className="skip-link sr-only" href="#sidebar">
        Skip&nbsp;to&nbsp;Sidebar
      </a>
    </div>
  );
}
