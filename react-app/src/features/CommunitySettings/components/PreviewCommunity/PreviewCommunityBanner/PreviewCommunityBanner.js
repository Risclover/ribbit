import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DropBox } from "@/components";
import { BannerHeight, PreviewCommunityBannerColor } from "..";

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

  const [activeRadio, setActiveRadio] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (bannerHeight === "80px") setActiveRadio("small");
    if (bannerHeight === "144px") setActiveRadio("medium");
    if (bannerHeight === "208px") setActiveRadio("large");
  }, [bannerHeight]);

  useEffect(() => {
    if (bannerColor !== "#33a8ff") {
      setCustomBannerColor(true);
    }
  }, [bannerColor, setCustomBannerColor]);

  // If user chooses "Small", set bannerHeight etc.
  useEffect(() => {
    switch (activeRadio) {
      case "small":
        setBannerHeight("80px");
        break;
      case "medium":
        setBannerHeight("144px");
        break;
      case "large":
        setBannerHeight("208px");
        break;
      default:
        break;
    }
  }, [activeRadio, setBannerHeight]);

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
          {["Small", "Medium", "Large"].map((option) => (
            <BannerHeight
              key={uuidv4()}
              height={bannerHeight}
              option={option}
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
            dropboxType="banner_img"
            community={community}
            setImage={setImageFile}
            startingImage={bannerImg}
            preview={bannerImg}
            setPreview={setBannerImg} // updates local preview
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
