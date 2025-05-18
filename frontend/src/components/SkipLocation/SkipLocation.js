import React from "react";
import "./SkipLocation.css";

export function SkipLocation({ showNavSidebar }) {
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
