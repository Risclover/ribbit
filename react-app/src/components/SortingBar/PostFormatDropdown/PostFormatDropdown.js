import React, { useEffect, useRef } from "react";
import { PostFormatDropdownBtn } from "./PostFormatDropdownBtn/PostFormatDropdownBtn";
import "./PostFormatDropdown.css";

export function PostFormatDropdown({ setShowDropdown, formats }) {
  const buttonRefs = useRef([]);

  useEffect(() => {
    function handleKeyDown(e) {
      const { key } = e;
      const focusedIndex = buttonRefs.current.findIndex(
        (ref) => ref === document.activeElement
      );

      if (key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (focusedIndex + 1) % formats.length;
        buttonRefs.current[nextIndex]?.focus();
      } else if (key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (focusedIndex - 1 + formats.length) % formats.length;
        buttonRefs.current[prevIndex]?.focus();
      } else if (key === "Escape") {
        setShowDropdown(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [formats.length, setShowDropdown]);

  return (
    <div
      className="post-format-dropdown"
      data-testid="post-format-dropdown"
      aria-labelledby="postFormatDropdownToggle"
    >
      <ul>
        {formats.map((item, index) => (
          <li key={item.format}>
            <PostFormatDropdownBtn
              setShowDropdown={setShowDropdown}
              item={item}
              ref={(el) => (buttonRefs.current[index] = el)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
