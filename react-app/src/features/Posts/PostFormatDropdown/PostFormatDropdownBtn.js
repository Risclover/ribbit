import React, { useEffect, useState, useRef } from "react";

function useOutsideAlerter(ref, setActive, active, setImg, item) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
        setImg(item.grey);
      }
    }

    if (document.querySelector(".post-format-dropdown")) {
      document
        .querySelector(".post-format-dropdown")
        .addEventListener("mousedown", handleClickOutside);
      return () => {
        document
          .querySelector(".post-format-face-wrapper")
          .removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, active, item.grey, setActive, setImg]);
}

export default function PostFormatDropdownBtn({
  format,
  setFormat,
  item,
  setShowDropdown,
}) {
  const wrapperRef = useRef(null);

  const [img, setImg] = useState();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (format === item.format) {
      setImg(item.colored);
    } else {
      setImg(item.grey);
    }
  }, [format, item.colored, item.format, item.grey]);

  useOutsideAlerter(wrapperRef, setActive, active, setImg, item);

  return (
    <button
      className="post-format-btn"
      ref={wrapperRef}
      onMouseEnter={() => {
        format === item.format ? setImg(item.colored) : setImg(item.black);
      }}
      onMouseLeave={() => {
        format === item.format ? setImg(item.colored) : setImg(item.img);
      }}
      onClick={() => {
        setActive(true);
        setShowDropdown(false);
        setFormat(item.format);
      }}
    >
      <img src={img ? img : item.img} alt="Item" />
      <span
        className={
          img === item.black
            ? "format-btn-black"
            : img === item.grey
            ? "format-btn-grey"
            : format === item.format
            ? "format-btn-active"
            : ""
        }
      >
        {item.format}
      </span>
    </button>
  );
}
