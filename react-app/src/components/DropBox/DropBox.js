import React, { useState } from "react";
import { UploadZone } from "./UploadZone";
import { PreviewBar } from "./PreviewBar";
import { useFileHandler } from "./useFileHandler";
import "./DropBox.css";

export const DropBox = ({ setImage, image, preview, setPreview }) => {
  const [highlight, setHighlight] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const { handleUpload } = useFileHandler(
    setImage,
    setPreview,
    setShowBar,
    showBar
  );

  const handleDragEvents = (highlight) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(highlight);
  };

  const handleErase = () => {
    setPreview("");
    setImage(null);
    setShowBar(false);
  };

  return (
    <div className="dropbox">
      {!showBar && (
        <div
          onDragEnter={handleDragEvents(true)}
          onDragOver={handleDragEvents(true)}
          onDragLeave={handleDragEvents(false)}
          onDrop={(e) => {
            handleDragEvents(false)(e);
            handleUpload(e);
          }}
          className={`upload${
            highlight ? " is-highlight" : preview ? " is-preview" : ""
          }`}
          style={{ backgroundImage: `url(${preview})` }}
        >
          <UploadZone onFileSelect={handleUpload} highlight={highlight} />
        </div>
      )}
      {showBar && (
        <PreviewBar
          highlight={highlight}
          showBar={showBar}
          preview={preview}
          onErase={handleErase}
        />
      )}
    </div>
  );
};
