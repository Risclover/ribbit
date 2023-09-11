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
  const [errorMsg, setErrorMsg] = useState("");

  const colorThemes = ["Base", "Highlight"];

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getCommunitySettings(community.id));
  }, [dispatch]);

  const handleSaveTheme = () => {
    const payload = {
      settingsId: community.communitySettings[community?.id].id,
      baseColor: base,
      highlight: highlight,
      bgColor: bodyBg,
      backgroundImgFormat: bgFormat,
    };
    dispatch(updateSettingsColorTheme(payload));
    dispatch(getCommunities());

    if (image) {
      changeBodyBackground();
    } else {
      setImage(null);
    }
    dispatch(getSingleCommunity(community.id));
    setOpenAppearance(false);
  };

  console.log("BG FORMAT:", bgFormat);
  console.log("BG IMG:", bodyBgPreview);

  const changeBodyBackground = async () => {
    const formData = new FormData();
    formData.append("image", image);
    const res = await fetch(`/api/communities/${community?.id}/bg_img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      dispatch(getSingleCommunity(community?.id));
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
            startingImage={bodyBgPreview}
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
