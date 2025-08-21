import { useState, useMemo, useEffect, DragEvent } from "react";
import { UploadZone } from "./UploadZone";
import { PreviewBar } from "./PreviewBar";
import { fileHandler } from "./fileHandler";
import "./DropBox.css";

/**
 * Custom image dropbox for uploading image from device
 *
 * @param setImage Setter for the uploaded image
 * @param preview  Preview of the uploaded image
 * @param setPreview  Setter for the preview of the uploaded image
 * @param defaultIcon URL of the default community icon
 * @param handleErase Handler for erasing image from dropbox
 *
 * @example
 * <DropBox
 *  setImage={setImage}
 *  preview={preview}
 *  setPreview={setPreview}
 *  defaultIcon="https://i.imgur.com/9CI9hiO.png"
 *  handleErase={handleErase}
 * />
 */
export const DropBox = ({
  setImage,
  preview,
  setPreview,
  defaultIcon = null,
  handleErase,
}) => {
  const [highlight, setHighlight] = useState(false);
  const showBar = !!preview && preview !== defaultIcon;

  const { handleUpload, revokePreview } = useMemo(
    () => fileHandler(setImage, setPreview),
    [setImage, setPreview]
  );

  // Revoke preview ONLY on unmount (not every render)
  useEffect(() => {
    return () => revokePreview();
  }, []); // intentionally empty

  const dropBoxClass = useMemo(
    () =>
      "upload" +
      (highlight ? " is-highlight" : "") +
      (showBar ? " is-preview" : ""),
    [highlight, showBar]
  );

  const handleDragEvents = (hl: boolean) => (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(hl);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvents(false)(e);
    handleUpload(e);
  };

  const handleDelete = () => {
    setPreview("");
    if (defaultIcon !== null) handleErase?.();
  };

  return (
    <div className="dropbox">
      {!showBar && (
        <div
          onDragEnter={handleDragEvents(true)}
          onDragOver={handleDragEvents(true)}
          onDragLeave={handleDragEvents(false)}
          onDrop={onDrop}
          className={dropBoxClass}
          style={{ backgroundImage: defaultIcon ? "" : `url(${preview})` }}
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
