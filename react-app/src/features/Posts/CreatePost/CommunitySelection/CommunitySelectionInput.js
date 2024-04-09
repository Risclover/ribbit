import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { TbChevronDown } from "react-icons/tb";
import "./CommunitySelection.css";

export function CommunitySelectionInput({
  setShowDropdown,
  search,
  setSearch,
  communityId,
  community,
  communityList,
}) {
  const [inputState, setInputState] = useState("choose");
  const communitySettings = useSelector((state) =>
    communityId
      ? state.communities[communityId]?.communitySettings[communityId]
      : null
  );
  console.log("communitySettings:", community);

  const handleFocus = () => {
    setInputState("search");
    setShowDropdown(true);
  };

  return (
    <div
      className="community-selection-input-box"
      onClick={() => setShowDropdown(true)}
    >
      <div className="inner-input-box">
        {!search && inputState === "search" && <BsSearch />}
        {!search && inputState === "choose" && (
          <div className="dotted-circle"></div>
        )}
        {community && search && (
          <img
            style={{
              backgroundColor:
                community?.communitySettings[community?.id].baseColor,
            }}
            className="community-dropdown-img"
            alt="Community"
            src={community?.communitySettings[community?.id].communityIcon}
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
          onBlur={(e) => {
            setInputState("choose");
          }}
          className="community-selection-input"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onFocus={handleFocus}
        />
        <button
          className="chevron-down-icon"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <TbChevronDown />
        </button>
      </div>
    </div>
  );
}
