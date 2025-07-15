import React from "react";
import { useAppDispatch } from "@/store";
import { getCommunitySettings, getCommunities, resetToDefault } from "@/store";

export const ResetToDefaultsWarning = ({ community, setShowResetWarning }) => {
  const dispatch = useAppDispatch();

  const handleDefaultReset = () => {
    dispatch(resetToDefault(community?.id));

    document.documentElement.style.setProperty(
      "--preview-community-color-theme-base",
      "#0079d3"
    );

    document.documentElement.style.setProperty(
      "--preview-community-color-theme-highlight",
      "#0079d3"
    );

    document.documentElement.style.setProperty(
      "--preview-community-theme-bodybg",
      "#dae0e6"
    );

    document.documentElement.style.setProperty(
      "--preview-community-color-picker-square",
      "#000000"
    );

    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img",
      ""
    );
    document.documentElement.style.setProperty(
      "--preview-community-body-bg-img-format",
      ""
    );
    document.documentElement.style.setProperty(
      "--preview-community-banner-height",
      "80px"
    );
    document.documentElement.style.setProperty(
      "--preview-community-banner-color",
      "#33a8ff"
    );
    document.documentElement.style.setProperty(
      "--preview-community-banner-img",
      "#33A8FF"
    );
    document.documentElement.style.setProperty("--preview-community-icon", "");
    document.documentElement.style.setProperty(
      "--preview-community-name-format",
      "c/"
    );

    dispatch(getCommunitySettings(community?.id));
    dispatch(getCommunities());
    setShowResetWarning(false);
  };

  return (
    <div className="outside-click-warning">
      <p>
        Resetting to defaults here will rollback all of your past edits to when
        your community was first created.
      </p>
      <div className="outside-click-warning-btns">
        <button
          className="blue-btn-unfilled btn-short"
          onClick={() => setShowResetWarning(false)}
        >
          Cancel
        </button>
        <button
          className="blue-btn-filled btn-short"
          onClick={handleDefaultReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
