import React, { useEffect, useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { CommunityThemeToggle } from "./CommunityThemeToggle";
import "./CommunityOptions.css";
import { useCommunitySettings } from "features/Posts/hooks/useCommunitySettings";
import { useDispatch } from "react-redux";
import { getCommunitySettings } from "store";

export function CommunityOptions({ community }) {
  const dispatch = useDispatch();
  const { checked, setChecked } = useCommunitySettings(community);

  const [showCommunityOptions, setShowCommunityOptions] = useState(false);

  const handleThemeToggle = (e) => {
    setChecked(!checked);
    if (checked)
      localStorage.setItem(`community-${community?.id}-theme`, "false");
    if (!checked)
      localStorage.setItem(`community-${community?.id}-theme`, "true");

    dispatch(getCommunitySettings(community?.id));
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
