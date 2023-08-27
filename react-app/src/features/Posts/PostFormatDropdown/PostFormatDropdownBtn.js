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
      setImg("active");
    } else {
      setImg("grey");
    }
  }, [format, item.format]);


  useOutsideAlerter(wrapperRef, setActive, active, setImg, item);

  return (
    <button
      className={
        img === item.blacks
          ? "post-format-btn format-btn-black"
          : img === "grey"
          ? "post-format-btn format-btn-grey"
          : format === item.format
          ? "post-format-btn format-btn-active"
          : "post-format-btn"
      }
      ref={wrapperRef}
      onClick={() => {
        setActive(true);
        setShowDropdown(false);
        setFormat(item.format);
      }}
    >
      {item.img}
      <span
        className={
          img === item.blacks
            ? "format-btn-black"
            : img === "grey"
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
