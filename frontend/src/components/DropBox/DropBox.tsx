import { useState, useMemo, useEffect, DragEvent } from "react";
import { UploadZone } from "./UploadZone";
import { PreviewBar } from "./PreviewBar";
import { fileHandler } from "./fileHandler";
import "./DropBox.css";

interface DropBoxProps {
  setImage: (file: File | null) => void;
  preview: string;
  setPreview: (url: string) => void;
  defaultIcon?: string | null;
  handleErase?: () => void;
}

export const DropBox = ({
  setImage,
  preview,
  setPreview,
  defaultIcon = null,
  handleErase,
}: DropBoxProps) => {
  const [highlight, setHighlight] = useState(false);
  const showBar = !!preview && preview !== defaultIcon;

  // ⬅️ Create stable handlers once, so cleanup only runs on unmount
  const { handleUpload, revokePreview } = useMemo(
    () => fileHandler(setImage, setPreview),
    [setImage, setPreview]
  );

  // ⬅️ Revoke preview ONLY on unmount (not every render)
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
