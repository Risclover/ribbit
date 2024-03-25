import React, { useContext, useState, useRef } from "react";
import { TbChevronDown } from "react-icons/tb";
import { formatIcons } from "../../../../assets";
import { PostFormatDropdown } from "./PostFormatDropdown";
import { PostFormatContext } from "../../../../context/PostFormat";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import "./PostFormatDropdown.css";

export function PostFormatFace() {
  const { format } = useContext(PostFormatContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  const formats = [
    { format: "Card", icons: formatIcons.Card },
    { format: "Classic", icons: formatIcons.Classic },
    { format: "Compact", icons: formatIcons.Compact },
  ];

  const getFormatIcon = (format) => {
    const formatItem = formats.find((f) => f.format === format);
    return formatItem ? formatItem.icons.grey : undefined;
  };

  return (
    <div className="post-format-face-wrapper" ref={wrapperRef}>
      <button
        className="post-format-face"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-expanded={showDropdown}
        data-testid="post-format-face-button"
        aria-label="Select post format"
        aria-haspopup="true"
        id="postFormatDropdownToggle"
      >
        <img src={getFormatIcon(format)} alt={`${format} format icon`} />
        <TbChevronDown />
      </button>
      {showDropdown && (
        <PostFormatDropdown
          setShowDropdown={setShowDropdown}
          formats={formats}
        />
      )}
    </div>
  );
}
