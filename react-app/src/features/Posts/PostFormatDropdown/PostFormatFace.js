import React, { useEffect, useRef, useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import Compact from "../../../images/post-format-icons/compact-grey.png";
import CompactBlack from "../../../images/post-format-icons/compact.png";
import CompactColored from "../../../images/post-format-icons/compact-colored.png";

import {
  TfiLayoutColumn2Alt,
  TfiLayoutColumn2,
  TfiLayoutColumn3Alt,
  TfiLayoutColumn3,
  TfiLayoutColumn4Alt,
  TfiLayoutColumn4,
} from "react-icons/tfi";

import PostFormatDropdown from "./PostFormatDropdown";
import HandleClickOutside from "../../../components/HandleClickOutside";
import "./PostFormatDropdown.css";

export default function PostFormatFace({ setFormat, format }) {
  const wrapperRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);

  const formats = [
    {
      format: "Card",
      img: <TfiLayoutColumn2Alt />,
    },
    {
      format: "Classic",
      img: <TfiLayoutColumn3Alt />,
    },
    {
      format: "Compact",
      img: <TfiLayoutColumn4Alt />,
    },
  ];

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
      });
    };
  }, [wrapperRef, showDropdown]);

  return (
    <div className="post-format-face-wrapper" ref={wrapperRef}>
      <button
        className="post-format-face"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {format === "Card" && <TfiLayoutColumn2Alt />}
        {format === "Classic" && <TfiLayoutColumn3Alt />}
        {format === "Compact" && <TfiLayoutColumn4Alt />}
        <TbChevronDown />
      </button>
      {showDropdown && (
        <PostFormatDropdown
          format={format}
          setFormat={setFormat}
          setShowDropdown={setShowDropdown}
          formats={formats}
        />
      )}
    </div>
  );
}
