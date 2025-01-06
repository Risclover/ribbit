import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCommunities,
  getSingleCommunity,
  getCommunitySettings,
  updateSettingsColorTheme,
} from "@/store";
import { DropBox } from "@/components";
import { PreviewCommunityColorThemeColor, BodyBgFormat } from "@/features";
import "../PreviewCommunity.css";
import { v4 as uuidv4 } from "uuid";

export function PreviewCommunityColorTheme({
  setOpenAppearance,
  community,
  base,
  setBase,
  highlight,
  setHighlight,
  backgroundImg,
  setBackgroundImg,
  backgroundImgFormat,
  setBackgroundImgFormat,
  bodyBgPreview,
  setBodyBgPreview,
  bgColor,
  setBgColor,
}) {
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(
    community?.communitySettings[community?.id]?.backgroundImg
  );

  console.log("preview:", preview);
  const colorThemes = ["Base", "Highlight"];

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community?.id));
  }, [dispatch]);

  const handleSaveTheme = () => {
    if (image === null || image === "" || image === undefined) {
      handleUpload();
    }
    const payload = {
      settingsId: community?.communitySettings[community?.id].id,
      baseColor: base,
      highlight: highlight,
      bgColor: bgColor,
      backgroundImgFormat: backgroundImgFormat,
      backgroundImg: backgroundImg,
    };
    if (image) {
      handleUpload();
    }

    dispatch(updateSettingsColorTheme(payload));
    dispatch(getCommunities());
    dispatch(getSingleCommunity(community?.id));

    if (preview !== null) {
      handlePreview();
    }
    setOpenAppearance(false);
  };

  const handlePreview = () => {
    if (backgroundImgFormat === "fill") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bgColor} url(${preview}) no-repeat center / cover`
      );
    } else if (backgroundImgFormat === "tile") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bgColor} url(${preview}) repeat center top`
      );
    } else if (backgroundImgFormat === "center") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bgColor} url(${preview}) no-repeat center top`
      );
    }
  };

  const handleDelete = () => {
    setImage("");
    setPreview(null);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    if (image === null || image === undefined || image === "") {
      formData.append("image", "");
    } else {
      formData.append("image", image);
    }

    const res = await fetch(`/api/communities/${community?.id}/bg_img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      dispatch(getSingleCommunity(community?.id));
      dispatch(getCommunities());
      setOpenAppearance(false);
    }
  };

  return (
    <div className="preview-community-color-theme">
      <h1>Color theme</h1>
      <div className="preview-community-theme-colors-box">
        <h2>Theme Colors</h2>
        {colorThemes.map((theme) => (
          <PreviewCommunityColorThemeColor
            theme={theme === "Base" ? base : highlight}
            community={community}
            setTheme={theme === "Base" ? setBase : setHighlight}
            name={theme}
            key={uuidv4()}
          />
        ))}
      </div>
      <div className="preview-community-theme-colors-box">
        <h2>Body Background</h2>
        <PreviewCommunityColorThemeColor
          theme={bgColor}
          community={community}
          setTheme={setBgColor}
          name="Color"
        />
        <div className="preview-community-theme-background-img">
          <h3>Image</h3>
          <DropBox
            preview={preview}
            setPreview={setPreview}
            setImage={setImage}
          />
          <div className="body-bg-formats" role="radiogroup">
            <input type="hidden" value={backgroundImgFormat} />
            {["fill", "tile", "center"].map((format) => (
              <BodyBgFormat
                key={uuidv4()}
                format={format}
                backgroundImgFormat={backgroundImgFormat}
                setBackgroundImgFormat={setBackgroundImgFormat}
                bodyBgPreview={bodyBgPreview}
                backgroundImg={backgroundImg}
                bgColor={bgColor}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="preview-community-theme-btns">
        <button className="blue-btn-filled btn-long" onClick={handleSaveTheme}>
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
