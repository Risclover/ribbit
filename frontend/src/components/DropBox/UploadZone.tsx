import { useId, useRef } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface UploadZoneProps {
  onFileSelect: React.ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  label?: React.ReactNode;
}

/**
 * Zone of DropBox where user can drag/drop images to upload, or click to open file explorer
 * @param onFileSelect - Image upload handler
 * @param accept - `accept` parameter of file input
 * @param label - Label
 *
 * @example
 * <UploadZone
 *    onFileSelect={handleUpload}
 * />
 */
export const UploadZone = ({
  onFileSelect,
  accept = "image/*",
  label = "Drag and Drop or Upload Image",
}: UploadZoneProps) => {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      {/* Keep input in the tree; associate via htmlFor */}
      <input
        id={inputId}
        ref={inputRef}
        type="file"
        className="upload-file"
        accept={accept}
        onChange={onFileSelect}
        // visually hide but keep accessible
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      />

      {/* Clicking the label natively opens the file dialog via htmlFor */}
      <label htmlFor={inputId} aria-label="Upload image">
        <div className="preview-community-upload-icon">
          <FaCloudUploadAlt />
        </div>
        <div className="preview-community-upload-txt">{label}</div>
      </label>
    </>
  );
};
