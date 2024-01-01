import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCommunities,
  getSingleCommunity,
  getCommunitySettings,
  updateSettingsColorTheme,
} from "../../../store";
import { DropBox } from "../../../components";
import {
  PreviewCommunityColorThemeColor,
  BodyBgFormat,
} from "../../../features";
import "./PreviewCommunity.css";

export function PreviewCommunityColorTheme({
  setOpenAppearance,
  community,
  base,
  setBase,
  highlight,
  setHighlight,
  bodyBg,
  setBodyBg,
  bodyBgPreview,
  setBodyBgPreview,
  bgFormat,
  setBgFormat,
}) {
  const dispatch = useDispatch();

  const [image, setImage] = useState();
  const [preview, setPreview] = useState(
    community?.communitySettings[community?.id].backgroundImg
  );

  const colorThemes = ["Base", "Highlight"];

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community?.id));
  }, [dispatch]);

  const handleSaveTheme = () => {
    const payload = {
      settingsId: community.communitySettings[community?.id].id,
      baseColor: base,
      highlight: highlight,
      bgColor: bodyBg,
      backgroundImgFormat: bgFormat,
    };

    if (image) {
      handleUpload();
    }

    dispatch(updateSettingsColorTheme(payload));
    dispatch(getCommunities());
    dispatch(getSingleCommunity(community?.id));
    setOpenAppearance(false);
  };

  const handlePreview = () => {
    if (bgFormat === "fill") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${preview}) no-repeat center / cover`
      );
    } else if (bgFormat === "tile") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${preview}) repeat center top`
      );
    } else if (bgFormat === "center") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${preview}) no-repeat center top`
      );
    }
  };

  const handleDelete = () => {
    setBodyBgPreview("");
    setImage("");
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (image !== "") {
      formData.append("image", image);
    } else {
      formData.append("image", "");
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
            base={base}
            community={community}
            setTheme={theme === "Base" ? setBase : setHighlight}
            highlight={highlight}
            name={theme}
          />
        ))}
      </div>
      <div className="preview-community-theme-colors-box">
        <h2>Body Background</h2>
        <PreviewCommunityColorThemeColor
          theme={bodyBg}
          community={community}
          setTheme={setBodyBg}
          name="Color"
        />
        <div className="preview-community-theme-background-img">
          <h3>Image</h3>
          <DropBox
            dropboxType="community_bg"
            community={community}
            preview={preview}
            setPreview={setPreview}
            setImage={setImage}
            image={image}
            handlePreview={handlePreview}
            handleDelete={handleDelete}
            handleImgUpload={handleUpload}
          />
          <div className="body-bg-formats" role="radiogroup">
            <input type="hidden" value={bgFormat} />
            {["fill", "tile", "center"].map((format) => (
              <BodyBgFormat
                format={format}
                bgFormat={bgFormat}
                setBgFormat={setBgFormat}
                backgroundImg={bodyBgPreview}
                bodyBg={bodyBg}
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
