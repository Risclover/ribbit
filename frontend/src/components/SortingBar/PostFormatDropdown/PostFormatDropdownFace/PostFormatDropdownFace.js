import React, { useContext, useState, useRef } from "react";
import { TbChevronDown } from "react-icons/tb";
import {
  CardFormatIcon,
  CardFormatIconActive,
  ClassicFormatIcon,
  ClassicFormatIconActive,
  CompactFormatIcon,
  CompactFormatIconActive,
} from "@/assets";
import { PostFormatDropdown } from "../PostFormatDropdown";
import { PostFormatContext } from "@/context";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import "../PostFormatDropdown.css";

export function PostFormatDropdownFace() {
  const { format } = useContext(PostFormatContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  const formats = [
    {
      format: "Card",
      icon: <CardFormatIcon />,
      activeIcon: <CardFormatIconActive />,
    },
    {
      format: "Classic",
      icon: <ClassicFormatIcon />,
      activeIcon: <ClassicFormatIconActive />,
    },
    {
      format: "Compact",
      icon: <CompactFormatIcon />,
      activeIcon: <CompactFormatIconActive />,
    },
  ];

  const getFormatIcon = (format) => {
    const formatItem = formats.find((f) => f.format === format);
    return formatItem ? formatItem.icon : undefined;
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
        id="PostFormatDropdownToggle"
      >
        {getFormatIcon(format)}
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
