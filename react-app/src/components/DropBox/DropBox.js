import React, { useEffect, useState } from "react";
import { UploadZone } from "./UploadZone";
import { PreviewBar } from "./PreviewBar";
import { useFileHandler } from "./useFileHandler";
import "./DropBox.css";
import { updateSettingsNameIcon } from "store";
import { useDispatch } from "react-redux";
const DEFAULT_ICON_URL = "https://i.imgur.com/9CI9hiO.png";

/**
 * A custom-made image dropbox, where images can be drag-and-dropped or uploaded from their device.
 *
 * @param {} setImage -
 * @param {} preview -
 * @param {} setPreview -
 * @param {} defaultIcon -
 *
 * @example
 * <DropBox setImage={setImage} preview={preview} setPreview={setPreview} defaultIcon={defaultIcon} />
 */
export const DropBox = ({
  setImage,
  preview,
  setPreview,
  defaultIcon = null,
  handleErase,
}) => {
  const dispatch = useDispatch();
  const [highlight, setHighlight] = useState(false);
  const showBar = preview && preview !== "" && preview !== defaultIcon;

  const { handleUpload } = useFileHandler(setImage, setPreview);

  const handleDragEvents = (highlight) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(highlight);
  };

  const dropBoxClass =
    "upload" +
    (highlight ? " is-highlight" : "") +
    (showBar ? " is-preview" : "");

  const handleDelete = async () => {
    // 1. Clear out local preview
    setPreview("");
    if (defaultIcon !== null) handleErase();
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
          className={dropBoxClass}
          style={{
            backgroundImage: defaultIcon ? "" : `url(${preview})`,
          }}
        >
          <UploadZone onFileSelect={handleUpload} />
        </div>
      )}
      {showBar && (
        <PreviewBar
        onErase={handleDelete}
          showBar={showBar}
          preview={preview}
        />
      )}
    </div>
  );
};
