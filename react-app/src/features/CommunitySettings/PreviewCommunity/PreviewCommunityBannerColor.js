import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { PreviewCommunityColorPicker } from "./PreviewCommunityColorPicker";
import { HandleClickOutside } from "@/utils";

export function PreviewCommunityBannerColor({
  name,
  theme,
  setTheme,
  community,
}) {
  const wrapperRef = useRef(null);
  const [openPicker, setOpenPicker] = useState(false);

  // useEffect(() => {
  //   document.addEventListener("mousedown", function (e) {
  //     HandleClickOutside(e, wrapperRef, openPicker, setOpenPicker);
  //   });
  //   return () => {
  //     document.removeEventListener("mousedown", function (e) {
  //       HandleClickOutside(e, wrapperRef, openPicker, setOpenPicker);
  //     });
  //   };
  // }, [wrapperRef, openPicker]);

  return (
    <div
      className="preview-community-color-theme-color"
      onClick={() => setOpenPicker(true)}
    >
      <h3>{name}</h3>
      <div className={`color-theme-color ${"color-theme-color-banner"}`}>
        {!openPicker && (
          <span className="color-theme-color-down">
            <FaChevronDown />
          </span>
        )}
        {openPicker && (
          <span className="color-theme-color-up">
            <FaChevronUp />
          </span>
        )}
      </div>
      {openPicker && (
        <div className="preview-community-color-picker" ref={wrapperRef}>
          <PreviewCommunityColorPicker
            theme={theme}
            setTheme={setTheme}
            community={community}
            openPicker={openPicker}
            setOpenPicker={setOpenPicker}
          />
        </div>
      )}
    </div>
  );
}
