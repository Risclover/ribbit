import React from "react";

export default function BackToTop({ community }) {
  return (
    <div className="back-to-top-box">
      <button
        className={`${
          community && "community-btn-filled"
        } blue-btn-filled btn-short`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to Top
      </button>
    </div>
  );
}
