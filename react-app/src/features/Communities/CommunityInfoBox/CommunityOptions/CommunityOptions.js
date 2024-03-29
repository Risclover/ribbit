import React, { useEffect, useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { CommunityThemeToggle } from "./CommunityThemeToggle";
import "./CommunityOptions.css";

export function CommunityOptions({ community }) {
  console.log("community:", community);
  const [checked, setChecked] = useState(
    localStorage.getItem(`community-${community?.id}-theme`) === "true"
      ? true
      : false
  );
  const [showCommunityOptions, setShowCommunityOptions] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(`community-${community?.id}-theme`)) {
      localStorage.setItem(`community-${community?.id}-theme`, "true");
    }

    if (localStorage.getItem(`community-${community?.id}-theme`) === "true") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [localStorage]);

  useEffect(() => {
    if (localStorage.getItem(`community-${community?.id}-theme`) === "true") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [localStorage]);

  if (checked) {
    document.documentElement.style.setProperty(
      "--community-base-color",
      community?.communitySettings[community?.id]?.baseColor
    );

    document.documentElement.style.setProperty(
      "--community-highlight",
      community?.communitySettings[community?.id]?.highlight
    );

    document.documentElement.style.setProperty(
      "--community-body-bg",
      community?.communitySettings[community?.id]?.bgColor
    );

    document.documentElement.style.setProperty(
      "--community-banner-height",
      community?.communitySettings[community?.id]?.bannerHeight
    );

    document.documentElement.style.setProperty(
      "--community-banner-color",
      community?.communitySettings[community?.id]?.customBannerColor
        ? community?.communitySettings[community?.id]?.bannerColor
        : community?.communitySettings[community?.id]?.baseColor
    );

    document.documentElement.style.setProperty(
      "--community-banner-img",
      `url("${community?.communitySettings[community?.id]?.bannerImg}")`
    );

    if (
      community?.communitySettings[community?.id]?.backgroundImgFormat ===
      "fill"
    ) {
      document.documentElement.style.setProperty(
        "--community-body-bg-img",
        `${community?.communitySettings[community?.id]?.bgColor} url(${
          community?.communitySettings[community?.id]?.backgroundImg
        }) no-repeat center / cover`
      );
    } else if (
      community?.communitySettings[community?.id]?.backgroundImgFormat ===
      "tile"
    ) {
      document.documentElement.style.setProperty(
        "--community-body-bg-img",
        `${community?.communitySettings[community?.id]?.bgColor} url(${
          community?.communitySettings[community?.id]?.backgroundImg
        }) repeat center top`
      );
    } else if (
      community?.communitySettings[community?.id]?.backgroundImgFormat ===
      "center"
    ) {
      document.documentElement.style.setProperty(
        "--community-body-bg-img",
        `${community?.communitySettings[community?.id]?.bgColor} url(${
          community?.communitySettings[community?.id]?.backgroundImg
        }) no-repeat center top`
      );
    }
  } else if (!checked) {
    document.documentElement.style.setProperty(
      "--community-base-color",
      "#0079d3"
    );

    document.documentElement.style.setProperty(
      "--community-highlight",
      "#0079d3"
    );

    document.documentElement.style.setProperty(
      "--community-base-color-text",
      "white"
    );

    document.documentElement.style.setProperty(
      "--community-body-bg",
      "#dae0e6"
    );

    document.documentElement.style.setProperty(
      "--community-banner-height",
      "80px"
    );

    document.documentElement.style.setProperty(
      "--community-banner-color",
      "#0079d3"
    );

    document.documentElement.style.setProperty("--community-banner-img", "");

    document.documentElement.style.setProperty("--community-body-bg-img", "");
  }

  const handleThemeToggle = (e) => {
    setChecked(!checked);
    if (checked)
      localStorage.setItem(`community-${community?.id}-theme`, "false");
    if (!checked)
      localStorage.setItem(`community-${community?.id}-theme`, "true");
  };

  return (
    <div className="community-options-container">
      <button
        role="button"
        className={`community-options-expander`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowCommunityOptions(!showCommunityOptions);
        }}
      >
        Community Options
        {showCommunityOptions ? <VscChevronUp /> : <VscChevronDown />}
      </button>
      {showCommunityOptions && (
        <div
          className="community-options-theme"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <span>
            {checked ? <PiEyeLight /> : <PiEyeSlashLight />} Community theme
          </span>
          <label>
            <CommunityThemeToggle
              checked={checked}
              setChecked={setChecked}
              handleThemeToggle={handleThemeToggle}
            />
          </label>
        </div>
      )}
    </div>
  );
}
