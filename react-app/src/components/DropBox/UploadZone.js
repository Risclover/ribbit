import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export const UploadZone = ({ onFileSelect, highlight }) => {
  return (
    <label>
      <div className="preview-community-upload-icon">
        <FaCloudUploadAlt />
      </div>

      <div className="preview-community-upload-txt">
        Drag and Drop or Upload Image
      </div>

      <div className="upload-button">
        <input
          type="file"
          className="upload-file"
          accept="image/*"
          onChange={onFileSelect}
          hidden
        />
      </div>
    </label>
  );
};
