import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DropBox } from "@/components";
import { BannerHeight, PreviewCommunityBannerColor } from "..";

const HEIGHT_MAP = {
  small: "80px",
  medium: "144px",
  large: "208px",
};

export function PreviewCommunityBanner({ setOpenAppearance, settingsState }) {
  const {
    community,
    bannerHeight,
    setBannerHeight,
    bannerColor,
    setBannerColor,
    setCustomBannerColor,
    bannerImg,
    setBannerImg,
    saveBanner,
  } = settingsState;

  // Figure out which radio is active based on the bannerHeight prop
  const [activeRadio, setActiveRadio] = useState(() => {
    const entry = Object.entries(HEIGHT_MAP).find(
      ([, heightValue]) => heightValue === bannerHeight
    );
    return entry ? entry[0] : "";
  });

  // If bannerHeight changes elsewhere, keep activeRadio in sync
  useEffect(() => {
    const newActiveRadio = Object.keys(HEIGHT_MAP).find(
      (key) => HEIGHT_MAP[key] === bannerHeight
    );
    setActiveRadio(newActiveRadio || "");
  }, [bannerHeight]);

  // Whenever activeRadio changes, update bannerHeight
  useEffect(() => {
    if (activeRadio) {
      setBannerHeight(HEIGHT_MAP[activeRadio]);
    }
  }, [activeRadio, setBannerHeight]);

  // If the bannerColor is different from default, set custom color
  useEffect(() => {
    setCustomBannerColor(bannerColor !== "#33a8ff");
  }, [bannerColor, setCustomBannerColor]);

  // Keep track of the currently selected image file
  const [imageFile, setImageFile] = useState(null);

  // Save and close
  const handleSaveClick = async () => {
    await saveBanner(imageFile);
    setOpenAppearance(false);
  };

  return (
    <div className="preview-community-color-theme">
      <h1>Banner</h1>

      <div className="preview-community-theme-colors-box">
        <h2>Height</h2>
        <div className="preview-community-name-icon-box">
          {Object.keys(HEIGHT_MAP).map((key) => (
            <BannerHeight
              key={uuidv4()}
              height={bannerHeight}
              option={key} // "small" / "medium" / "large"
              activeRadio={activeRadio}
              setActiveRadio={setActiveRadio}
              community={community}
            />
          ))}
        </div>
      </div>

      <div className="preview-community-theme-colors-box">
        <h2>Background</h2>
        <PreviewCommunityBannerColor
          theme={bannerColor}
          setTheme={setBannerColor}
          community={community}
          name="Color"
        />
        <div className="preview-community-name-icon-box">
          <h3>Custom Image</h3>
          <DropBox
            setImage={setImageFile}
            preview={bannerImg}
            setPreview={setBannerImg}
          />
          <p>Required size: 256x256px</p>
        </div>
      </div>

      <div className="preview-community-theme-btns">
        <button className="blue-btn-filled btn-long" onClick={handleSaveClick}>
          Save
        </button>
        <button
          className="blue-btn-unfilled btn-long"
          onClick={() => setOpenAppearance(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
