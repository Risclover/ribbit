import React, { useEffect, useState } from "react";
import "./PreviewCommunity.css";
import PreviewCommunityColorThemeColor from "./PreviewCommunityColorThemeColor";
import { useDispatch, useSelector } from "react-redux";
import {
  editCommunityTheme,
  getCommunities,
} from "../../../../store/communities";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DropBox from "../../../../components/DragNDropImageUpload/DropBox";
import BodyBgFormat from "./BodyBgFormat";
import { getSingleCommunity } from "../../../../store/one_community";
import {
  getCommunitySettings,
  updateSettingsColorTheme,
} from "../../../../store/community_settings";

export default function PreviewCommunityColorTheme({
  setOpenAppearance,
  community,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const communitySettings = useSelector(
    (state) => state.communitySettings[community.id]
  );
  const [base, setBase] = useState(communitySettings.baseColor);
  const [highlight, setHighlight] = useState(communitySettings.highlight);
  const [bodyBg, setBodyBg] = useState(communitySettings.bgColor);
  const [bgFormat, setBgFormat] = useState(
    communitySettings.backgroundImgFormat
  );
  const [bodyBgPreview, setBodyBgPreview] = useState(
    communitySettings.backgroundImg
  );
  const [image, setImage] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--preview-community-color-theme-base",
      base
    );

    document.documentElement.style.setProperty(
      "--preview-community-color-theme-highlight",
      highlight
    );

    document.documentElement.style.setProperty(
      "--preview-community-color-theme-bodybg",
      bodyBg
    );

    if (bgFormat === "fill") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${bodyBgPreview}) no-repeat center / cover`
      );
    } else if (bgFormat === "tile") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${bodyBgPreview}) repeat center top`
      );
    } else if (bgFormat === "center") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${bodyBgPreview}) no-repeat center top`
      );
    }

    const varColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue("--preview-community-body-bg-img");

    console.log(varColor);
  }, [base, highlight, bodyBg, community, bgFormat]);

  const colorThemes = ["Base", "Highlight"];

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community.id));
  }, [dispatch]);

  const handleSaveTheme = async () => {
    const payload = {
      settingsId: communitySettings.id,
      baseColor: base,
      highlight: highlight,
      bgColor: bodyBg,
      backgroundImg: communitySettings.backgroundImg,
      backgroundImgFormat: bgFormat,
    };
    console.log("payload:", payload);
    const data = await dispatch(updateSettingsColorTheme(payload));
    console.log("data", data);
    dispatch(getCommunities());

    if (image) {
      changeBodyBackground();
    } else {
    }
    dispatch(getSingleCommunity(community.id));
    setOpenAppearance(false);
  };

  const handleBgFormat = (format) => {
    setBgFormat(format);
  };

  const changeBodyBackground = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(`/api/communities/${community.id}/bg_img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      dispatch(getSingleCommunity(community.id));
      setOpenAppearance(false);
    } else {
      setErrorMsg(
        "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
      );
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
          />
        ))}
      </div>
      <div className="preview-community-theme-colors-box">
        <h2>Body Background</h2>
        <PreviewCommunityColorThemeColor
          theme={bodyBg}
          community={community}
          setTheme={setBodyBg}
        />
        <div className="preview-community-theme-background-img">
          <h3>Image</h3>
          <DropBox
            community={community}
            startingImage={community.communitySettings.backgroundImg}
            setImage={setImage}
            image={image}
            bgFormat={bgFormat}
            bodyBgPreview={bodyBgPreview}
            bodyBg={bodyBg}
            setBodyBgPreview={setBodyBgPreview}
          />
          <div className="body-bg-formats" role="radiogroup">
            <input type="hidden" value={bgFormat} />
            {["fill", "tile", "center"].map((format) => (
              <BodyBgFormat
                format={format}
                bgFormat={bgFormat}
                setBgFormat={setBgFormat}
                onClick={() => handleBgFormat(format)}
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
