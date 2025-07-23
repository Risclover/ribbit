import React, { useCallback, useMemo } from "react";

interface BackToTopProps {
  /** Element to scroll; window scrolls when omitted */
  containerRef?: React.RefObject<HTMLElement>;
  /** Adds community-themed styling */
  community?: boolean;
}

/**
 * "Back to top" button; scrolls to top of page when clicked.
 */
const BackToTop: React.FC<BackToTopProps> = React.memo(
  ({ containerRef, community = false }) => {
    const handleClick = useCallback(() => {
      if (containerRef?.current) {
        containerRef.current.scroll({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, [containerRef]);

    const btnClass = useMemo(
      () =>
        `blue-btn-filled btn-short${community ? " community-btn-filled" : ""}`,
      [community]
    );

    return (
      <div className="back-to-top-box">
        <button
          aria-label="Back to top"
          className={btnClass}
          onClick={handleClick}
        >
          Back to Top
        </button>
      </div>
    );
  }
);

export { BackToTop };
