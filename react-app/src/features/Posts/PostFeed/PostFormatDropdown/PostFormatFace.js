import React, { useContext, useEffect, useRef, useState } from "react";
import { TbChevronDown } from "react-icons/tb";
import {
  TfiLayoutColumn2Alt,
  TfiLayoutColumn3Alt,
  TfiLayoutColumn4Alt,
} from "react-icons/tfi";

import { PostFormatDropdown } from "./PostFormatDropdown";
import { HandleClickOutside } from "../../../../utils";
import "./PostFormatDropdown.css";
import { PostFormatContext } from "../../../../context/PostFormat";

export function PostFormatFace() {
  const wrapperRef = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  const { format } = useContext(PostFormatContext);

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

  // useEffect(() => {
  //   document.addEventListener("mousedown", function (e) {
  //     HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
  //   });
  //   return () => {
  //     document.removeEventListener("mousedown", function (e) {
  //       HandleClickOutside(e, wrapperRef, showDropdown, setShowDropdown);
  //     });
  //   };
  // }, [wrapperRef, showDropdown]);

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
          setShowDropdown={setShowDropdown}
          formats={formats}
        />
      )}
    </div>
  );
}
