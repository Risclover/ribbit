import React, { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { VscChevronDown, VscChevronUp } from "react-icons/vsc";
import { CommunityThemeToggle } from "./CommunityThemeToggle";
import { useCommunitySettings } from "@/features/Posts/hooks/useCommunitySettings";
import { useDispatch } from "react-redux";
import { getCommunitySettings } from "@/store";
import "./CommunityOptions.css";

export function CommunityOptions({ checked, setChecked, community }) {
  const dispatch = useDispatch();
  const [showCommunityOptions, setShowCommunityOptions] = useState(false);

  const handleThemeToggle = (e) => {
    const themes = JSON.parse(localStorage.getItem("community-themes"));

    setChecked(!checked);
    themes[community?.id] = checked;

    localStorage.setItem("community-themes", JSON.stringify(themes));
    dispatch(getCommunitySettings(community?.id));
  };
  return (
    <div className="community-options-container">
      <button
        role="button"
        className="community-options-expander"
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
              handleThemeToggle={handleThemeToggle}
            />
          </label>
        </div>
      )}
    </div>
  );
}
