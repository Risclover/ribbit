import React from "react";
import "./SkipLocation.css";
import { useIsMobile, useIsSmallScreen } from "hooks";

export function SkipLocation({ showNavSidebar }) {
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();

  if (isMobile || isSmall) return null;
  return (
    <div className="skip-location">
      {showNavSidebar && (
        <a className="skip-link sr-only" href="#side-navigation">
          Skip to Navigation
        </a>
      )}
      <a className="skip-link sr-only" href="#sidebar">
        Skip to Sidebar
      </a>
    </div>
  );
}
