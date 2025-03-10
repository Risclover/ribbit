import React, { useEffect, useRef, useState } from "react";
import "./SkipLocation.css";
import { useSkipLocation } from "context/SkipLocationContext";

export default function SkipLocation() {
  const { showLinks, setShowLinks } = useSkipLocation();

  return (
    <>
      {showLinks && (
        <div className="skip-location" onBlur={() => setShowLinks(false)}>
          <a
            className="skip-link"
            id="skip-nav"
            href="#side-navigation"
            tabIndex={0}
          >
            Skip to Navigation
          </a>

          <a
            className="skip-link"
            id="skip-sidebar"
            href="#sidebar"
            tabIndex={0}
            onBlur={() => setShowLinks(false)}
          >
            Skip to Sidebar
          </a>
        </div>
      )}
    </>
  );
}
