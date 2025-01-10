import React, { useEffect, useState } from "react";
import { UploadZone } from "./UploadZone";
import { PreviewBar } from "./PreviewBar";
import { useFileHandler } from "./useFileHandler";
import "./DropBox.css";

export const DropBox = ({
  setImage,
  preview,
  setPreview,
  defaultIcon = null,
}) => {
  const [highlight, setHighlight] = useState(false);
  const [showBar, setShowBar] = useState(preview !== null && preview !== "");

  const { handleUpload } = useFileHandler(setImage, setPreview, setShowBar);

  const handleDragEvents = (highlight) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(highlight);
  };

  const handleErase = (e) => {
    setPreview("");
    setShowBar(false);
  };

  useEffect(() => {
    if (defaultIcon) {
      setShowBar(false);
      setPreview("");
    }
  }, [defaultIcon]);

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
          style={{
            backgroundImage: defaultIcon ? "" : `url(${preview})`,
          }}
        >
          <UploadZone onFileSelect={handleUpload} />
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
