import React from "react";

export function BackToTop({ community, ref }) {
  const scrollToRef = () => {
    if (ref) {
      ref.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="back-to-top-box">
      <button
        className={`${
          community && "community-btn-filled"
        } blue-btn-filled btn-short`}
        onClick={scrollToRef}
      >
        Back to Top
      </button>
    </div>
  );
}
