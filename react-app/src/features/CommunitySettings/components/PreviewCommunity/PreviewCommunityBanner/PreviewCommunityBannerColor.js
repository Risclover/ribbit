import React, { useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { PreviewCommunityColorPicker } from "../PreviewCommunityColorTheme/PreviewCommunityColorPicker";
import { useOutsideClick } from "hooks";

export function PreviewCommunityBannerColor({
  name,
  theme,
  setTheme,
  community,
}) {
  const wrapperRef = useRef(null);
  const [openPicker, setOpenPicker] = useState(false);

  useOutsideClick(wrapperRef, () => setOpenPicker(false));

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
        <div
          className="preview-community-color-picker"
          onClick={(e) => e.stopPropagation()} // Prevent event bubbling
          ref={wrapperRef}
        >
          <PreviewCommunityColorPicker
            theme={theme}
            setTheme={setTheme}
            community={community}
            setOpenPicker={setOpenPicker}
            openPicker={openPicker}
          />
        </div>
      )}
    </div>
  );
}
