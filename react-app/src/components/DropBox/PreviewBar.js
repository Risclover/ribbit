import React from "react";
import { FaTrash } from "react-icons/fa";

export const PreviewBar = ({ onErase, showBar, preview, highlight }) => {
  return (
    <div className="preview-img" style={{ backgroundImage: `url(${preview})` }}>
      <div
        className={`preview-community-icon-preview-bar ${
          showBar ? "icon-preview-appear" : "icon-preview-hidden"
        }`}
        onClick={onErase}
      >
        <button>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
