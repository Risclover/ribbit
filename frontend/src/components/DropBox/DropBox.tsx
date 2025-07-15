import {
  useState,
  useMemo,
  useRef,
  useEffect,
  DragEvent,
  KeyboardEvent,
} from "react";
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
  const showBar = preview && preview !== defaultIcon;

  // get both helpers from fileHandler
  const { handleUpload, revokePreview } = fileHandler(setImage, setPreview);

  // clean up blob-URL when component unmounts
  useEffect(() => () => revokePreview(), [revokePreview]);

  const dropBoxClass = useMemo(
    () =>
      "upload" +
      (highlight ? " is-highlight" : "") +
      (showBar ? " is-preview" : ""),
    [highlight, showBar]
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const openFileDialog = () =>
    containerRef.current
      ?.querySelector<HTMLInputElement>('input[type="file"]')
      ?.click();

  const handleDragEvents = (hl: boolean) => (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(hl);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvents(false)(e);
    handleUpload(e); // fileHandler now checks MIME + updates state
  };

  const handleDelete = () => {
    setPreview("");
    if (defaultIcon !== null) handleErase?.();
  };

  return (
    <div className="dropbox">
      {!showBar && (
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
            e.key === "Enter" && openFileDialog()
          }
          onDragEnter={handleDragEvents(true)}
          onDragOver={handleDragEvents(true)}
          onDragLeave={handleDragEvents(false)}
          onDrop={onDrop}
          className={dropBoxClass}
          style={{ backgroundImage: defaultIcon ? "" : `url(${preview})` }}
        >
          <UploadZone onFileSelect={handleUpload} accept="image/*" />
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
