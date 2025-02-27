import React, { useEffect, useRef, useState } from "react";
import "./SkipLocation.css";

/**
 * Renders a container that is hidden by default.
 * When the user tabs onto it from the navigation,
 * it first shows "Skip to Navigation".
 * After you tab away from that link, it shows "Skip to Sidebar".
 * Tabbing away from the second link hides the entire container.
 */
export default function SkipLocation() {
  const containerRef = useRef(null);

  // Which "step" of the cycle are we on?
  // 0 => hidden
  // 1 => show link to Navigation
  // 2 => show link to Sidebar
  const [step, setStep] = useState(0);

  // We'll track if the user actually focuses our container or its children
  // so we know when to show/hide the skip links.
  const handleContainerFocus = () => {
    // If we are fully hidden (step=0), move to step=1 (show first link).
    if (step === 0) {
      setStep(1);
    }
  };

  // We'll do a small delay on blur to see where focus went.
  const handleContainerBlur = () => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        // Is focus still inside this container?
        const focusedWithin = containerRef.current.contains(
          document.activeElement
        );
        // If not, reset to step=0 (fully hidden)
        if (!focusedWithin) {
          setStep(0);
        }
      }
    });
  };

  // When the first link blurs, if the user is still in the container,
  // we assume they've tabbed to the second link => step=2.
  const handleFirstLinkBlur = () => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        const focusedWithin = containerRef.current.contains(
          document.activeElement
        );
        if (focusedWithin && step === 1) {
          setStep(2);
        }
      }
    });
  };

  // When the second link blurs, if the user is still in the container,
  // that means they've tabbed away from the second link => hide everything.
  const handleSecondLinkBlur = () => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        const focusedWithin = containerRef.current.contains(
          document.activeElement
        );
        // If focus is no longer in container, hide container (step=0).
        // If it is within, that might mean they've SHIFT+TAB'd back to the first link,
        // in which case step should go back to 1. That depends on desired logic.
        if (!focusedWithin) {
          setStep(0);
        } else {
          // SHIFT+TAB back to first link
          setStep(1);
        }
      }
    });
  };

  return (
    <div
      className="skip-location-container"
      ref={containerRef}
      onFocus={handleContainerFocus}
      onBlur={handleContainerBlur}
    >
      {step === 1 && (
        <a
          className="skip-link"
          href="#side-navigation"
          onBlur={handleFirstLinkBlur}
        >
          Skip to Navigation
        </a>
      )}

      {step === 2 && (
        <a className="skip-link" href="#sidebar" onBlur={handleSecondLinkBlur}>
          Skip to Sidebar
        </a>
      )}
    </div>
  );
}
