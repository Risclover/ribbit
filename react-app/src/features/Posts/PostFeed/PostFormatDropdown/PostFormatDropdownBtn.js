import React, { useState, useRef, useContext } from "react";
import { PostFormatContext } from "../../../../context/PostFormat";

export function PostFormatDropdownBtn({ item, setShowDropdown }) {
  const wrapperRef = useRef(null);
  const { format, setFormat } = useContext(PostFormatContext);

  const [active, setActive] = useState(item.format === format);
  const [highlight, setHighlight] = useState(false);

  return (
    <button
      className={
        !active && highlight
          ? "post-format-btn format-btn-black"
          : !active && !highlight
          ? "post-format-btn format-btn-grey"
          : active && !highlight
          ? "post-format-btn format-btn-active"
          : "post-format-btn"
      }
      onClick={() => {
        setActive(true);
        setShowDropdown(false);
        setFormat(item.format);
      }}
      onMouseOver={() => {
        !active ? setHighlight(true) : setHighlight(false);
      }}
      onMouseLeave={() => setHighlight(false)}
      ref={wrapperRef}
    >
      <img
        alt={`${item.format.toLowerCase()} format icon`}
        src={
          active
            ? item.icons.blue
            : !active && !highlight
            ? item.icons.grey
            : item.icons.black
        }
      />

      {item.format}
    </button>
  );
}
