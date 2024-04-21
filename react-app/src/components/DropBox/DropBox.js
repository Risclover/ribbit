import React, { useEffect, useState } from "react";
import { UploadZone } from "./UploadZone";
import { PreviewBar } from "./PreviewBar";
import { useFileHandler } from "./useFileHandler";
import "./DropBox.css";

export const DropBox = ({
  dropboxType,
  setImage,
  image,
  preview,
  setPreview,
  handlePreview,
  handleDelete,
  defaultIcon,
  setDefaultIcon,
}) => {
  const [highlight, setHighlight] = useState(false);
  const [showBar, setShowBar] = useState(preview !== null && preview !== "");

  const { handleUpload } = useFileHandler(
    setImage,
    setPreview,
    setShowBar,
    showBar,
    handlePreview
  );

  const handleDragEvents = (highlight) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(highlight);
  };

  const handleErase = (e) => {
    setPreview(null);
    setShowBar(false);
    handleDelete(e);
  };

  useEffect(() => {
    if (defaultIcon) {
      setShowBar(false);
      setPreview(null);
    }
  }, [defaultIcon]);

  // useEffect(() => {
  //   if (dropboxType === "community_icon") {
  //     if (preview === "https://i.imgur.com/9CI9hiO.png") {
  //       setShowBar(false);
  //     } else {
  //       setDefaultIcon(false);
  //     }
  //   }
  // }, [preview, dropboxType]);

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
