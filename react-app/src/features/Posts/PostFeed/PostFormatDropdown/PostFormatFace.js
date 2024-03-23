import React, { useContext, useState, useRef } from "react";
import { TbChevronDown } from "react-icons/tb";

import CardBlue from "../../../../assets/images/post-format-icons/card-blue.png";
import CardGrey from "../../../../assets/images/post-format-icons/card-grey-thicker.png";
import CardIcon from "../../../../assets/images/post-format-icons/card-icon-thicker.png";
import ClassicBlue from "../../../../assets/images/post-format-icons/classic-blue-wide.png";
import ClassicGrey from "../../../../assets/images/post-format-icons/classic-icon-thick-grey.png";
import ClassicIcon from "../../../../assets/images/post-format-icons/classic-icon-thick.png";
import CompactBlue from "../../../../assets/images/post-format-icons/compact-blue-thin.png";
import CompactGrey from "../../../../assets/images/post-format-icons/compact-grey-thin.png";
import CompactIcon from "../../../../assets/images/post-format-icons/compact-icon-thin.png";

import { PostFormatDropdown } from "./PostFormatDropdown";
import { PostFormatContext } from "../../../../context/PostFormat";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import "./PostFormatDropdown.css";

export function PostFormatFace() {
  const { format } = useContext(PostFormatContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const formats = [
    {
      format: "Card",
      icons: { black: CardIcon, blue: CardBlue, grey: CardGrey },
    },
    {
      format: "Classic",
      icons: { black: ClassicIcon, blue: ClassicBlue, grey: ClassicGrey },
    },
    {
      format: "Compact",
      icons: { black: CompactIcon, blue: CompactBlue, grey: CompactGrey },
    },
  ];

  return (
    <div className="post-format-face-wrapper" ref={wrapperRef}>
      <button
        className="post-format-face"
        onClick={toggleDropdown}
        data-testid="post-format-face-button"
      >
        {formats.map((item) =>
          item.format === format ? <img src={item.icons.grey} /> : ""
        )}
        <TbChevronDown />
      </button>
      {showDropdown && (
        <PostFormatDropdown
          setShowDropdown={setShowDropdown}
          formats={formats}
          wrapperRef={wrapperRef}
        />
      )}
    </div>
  );
}
