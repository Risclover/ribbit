import { useMemo, HTMLAttributes } from "react";
import { FaTrash } from "react-icons/fa";

interface PreviewBarProps extends HTMLAttributes<HTMLDivElement> {
  onErase: () => void;
  showBar: boolean;
  preview: string;
  className?: string;
}

export const PreviewBar = ({
  onErase,
  showBar,
  preview,
  className = "",
  ...rest
}: PreviewBarProps) => {
  const bgStyle = useMemo(
    () => ({ backgroundImage: `url(${preview})` }),
    [preview]
  );

  return (
    <div className={`preview-img ${className}`} style={bgStyle} {...rest}>
      <div
        className={
          "preview-community-icon-preview-bar " +
          (showBar ? "icon-preview-appear" : "icon-preview-hidden")
        }
      >
        <button type="button" aria-label="Delete" onClick={onErase}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
