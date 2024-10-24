import React from "react";
import { FaTrash } from "react-icons/fa";

export const PreviewBar = ({ onErase, showBar, preview }) => {
  return (
    <div className="preview-img" style={{ backgroundImage: `url(${preview})` }}>
      <div
        className={`preview-community-icon-preview-bar ${
          showBar ? "icon-preview-appear" : "icon-preview-hidden"
        }`}
        onClick={onErase}
      >
        <button aria-label="Delete">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
