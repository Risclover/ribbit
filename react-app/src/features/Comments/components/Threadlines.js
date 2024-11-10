import React from "react";

export default function Threadlines({ level }) {
  return (
    <div className="threadlines-container">
      {Array.from({ length: level }, (_, idx) => {
        if (idx === level - 1) {
          return (
            <div className="currentlevel-threadline-container">
              <div
                className="currentlevel-threadline"
                onClick={handleCollapseToggle}
              >
                <div className="threadline"></div>
              </div>
            </div>
          );
        } else {
          return (
            <div className={`level-threadline`}>
              <div className="threadline"></div>
            </div>
          );
        }
      })}
    </div>
  );
}
