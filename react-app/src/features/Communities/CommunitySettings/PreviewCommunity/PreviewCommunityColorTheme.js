import React, { useEffect, useState } from "react";
import "./PreviewCommunity.css";
import PreviewCommunityColorThemeColor from "./PreviewCommunityColorThemeColor";
import { useDispatch } from "react-redux";
import {
  editCommunityTheme,
  getCommunities,
} from "../../../../store/communities";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DropBox from "../../../../components/DragNDropImageUpload/DropBox";
import BodyBgFormat from "./BodyBgFormat";

export default function PreviewCommunityColorTheme({
  setOpenAppearance,
  community,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [base, setBase] = useState(community?.baseColor);
  const [highlight, setHighlight] = useState(community?.highlight);
  const [bodyBg, setBodyBg] = useState(community?.bodyBg);
  const [bgFormat, setBgFormat] = useState("fill");
  const [image, setImage] = useState();

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
  }, [base, highlight, bodyBg]);

  const colorThemes = ["Base", "Highlight"];

  useEffect(() => {
    console.log("bodyBg:", bodyBg);
  }, [bodyBg]);

  useEffect(() => {
    dispatch(getCommunities());
  }, [dispatch]);

  const handleSaveTheme = async () => {
    const payload = {
      communityId: community?.id,
      baseColor: base,
      highlight: highlight,
      bodyBg: bodyBg,
    };
    console.log("payload:", payload);
    const data = await dispatch(editCommunityTheme(payload));
    console.log("data", data);
    dispatch(getCommunities());
    setOpenAppearance(false);
  };

  const handleBgFormat = (format) => {
    setBgFormat(format);

    console.log("format:", format);
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
            startingImage={community.backgroundImg}
            setImage={setImage}
            image={image}
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
