import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TbChevronDown } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import "./CommunitySelection.css";

export default function CommunitySelectionInput({
  setShowDropdown,
  search,
  showDropdown,

  setSearch,
  name,
}) {
  const [inputState, setInputState] = useState("choose");
  const { communityId } = useParams();
  const communities = useSelector((state) => state.communities);

  const handleFocus = (e) => {
    e.preventDefault();
    setInputState("search");
    handleOpen(e);
  };
  const handleOpen = (e) => {
    e.preventDefault();
    setShowDropdown(true);
    name.length > 0 && setShowDropdown(true);
  };

  return (
    <div className="community-selection-input-box">
      <div className="inner-input-box">
        {!search && inputState === "search" && <BsSearch />}
        {!search && inputState === "choose" && (
          <div className="dotted-circle"></div>
        )}
        {search && (
          <img
            className="community-dropdown-img"
            src={communities[+communityId]?.communityImg}
          />
        )}
        {search?.length > 0 && (
          <span className="community-selection-span">c/</span>
        )}
        <input
          type="text"
          placeholder={
            inputState === "search"
              ? "Search communities"
              : "Choose a community"
          }
          onBlur={() => setInputState("choose")}
          className="community-selection-input"
          onChange={(e) => {
            setSearch(e.target.value);
            setShowDropdown(true);
          }}
          value={search}
          onFocus={handleFocus}
        />
      </div>

      <button
        className="chevron-down-icon"
        onClick={(e) => {
          e.preventDefault();
          setShowDropdown(!showDropdown);
        }}
      >
        <TbChevronDown />
      </button>
    </div>
  );
}
