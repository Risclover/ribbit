import React from "react";

export default function BackToTop() {
  return (
    <div className="back-to-top-box">
      <button
        className="blue-btn-filled btn-short"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to Top
      </button>
    </div>
  );
}
