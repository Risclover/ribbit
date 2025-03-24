import React from "react";
import "./SkipLocation.css";

export default function SkipLocation() {
  return (
    <div className="skip-location">
      <a className="skip-link sr-only" href="#side-navigation">
        Skip to Navigation
      </a>
      <a className="skip-link sr-only" href="#sidebar">
        Skip to Sidebar
      </a>
    </div>
  );
}
