import { ChangeEventHandler, KeyboardEvent, useRef, ReactNode } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

interface UploadZoneProps {
  onFileSelect: ChangeEventHandler<HTMLInputElement>;
  accept?: string;
  label?: ReactNode;
}

export const UploadZone = ({
  onFileSelect,
  accept = "image/*",
  label = "Drag and Drop or Upload Image",
}: UploadZoneProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileDialog = () => inputRef.current?.click();

  return (
    <label
      tabIndex={0}
      aria-label="Upload image"
      onKeyDown={(e: KeyboardEvent<HTMLLabelElement>) =>
        e.key === "Enter" && openFileDialog()
      }
      onClick={openFileDialog}
    >
      <div className="preview-community-upload-icon">
        <FaCloudUploadAlt />
      </div>

      <div className="preview-community-upload-txt">{label}</div>

      <input
        ref={inputRef}
        type="file"
        className="upload-file"
        accept={accept}
        onChange={onFileSelect}
        hidden
      />
    </label>
  );
};
