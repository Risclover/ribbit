import React, { useContext } from "react";
import { PostFormatDropdownFace } from "./PostFormatDropdown";
import { PostFormatContext } from "@/context";
import "./SortingBar.css";

const SortButton = ({ active, onClick, community, icon, label }) => {
  const buttonClass = `post-sorting-bar-btn ${
    active ? "active-sort-btn" : ""
  } ${community ? "community-sorting-bar-btn" : ""}`;
  return (
    <button aria-label={label} className={buttonClass} onClick={onClick}>
      <i className={icon}></i>
      {label}
    </button>
  );
};

export function SortingBar({ community, sortMode, setSortMode, isPage }) {
  const { format } = useContext(PostFormatContext);

  const sortModes = [
    { key: "new", label: "New", icon: "fa-solid fa-certificate" },
    { key: "top", label: "Top", icon: "fa-solid fa-ranking-star" },
  ];

  const handleSortClick = (mode) => () => {
    setSortMode(mode);
  };

  return (
    <div className="post-sorting-bar">
      <div className="post-sorting-bar-left">
        {sortModes.map((mode) => (
          <SortButton
            key={mode.key}
            active={sortMode === mode.key}
            onClick={handleSortClick(mode.key)}
            community={community}
            icon={mode.icon}
            label={mode.label}
          />
        ))}
      </div>
      {format !== "none" && isPage !== "profile" && <PostFormatDropdownFace />}
    </div>
  );
}
