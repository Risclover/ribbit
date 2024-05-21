import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { TbChevronDown } from "react-icons/tb";
import "./CommunitySelection.css";
import { useHistory, useParams } from "react-router-dom";

export function CommunitySelectionInput({
  setShowDropdown,
  showDropdown,
  search,
  setSearch,
  communityId,
  community,
  communityList,
  setCommunity,
  setInputState,
  inputState,
}) {
  const { communityName } = useParams();
  const history = useHistory();

  const communities = useSelector((state) => Object.values(state.communities));

  const handleFocus = () => {
    setInputState("search");
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setInputState("choose");
    if (search === "") {
      setCommunity(null);
      history.push("/submit");
    }
  };

  useEffect(() => {
    if (communityId) {
      const initialCommunity = communities.find((c) => c.id === communityId);
      if (initialCommunity) {
        setCommunity(initialCommunity);
        // setSearch(initialCommunity.name);
      }
    }
  }, [communityId, communities, setCommunity, setSearch]);

  const handleKeyPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();
      const foundCommunity = communities.find(
        (comm) => comm.name === e.target.value
      );
      if (foundCommunity) {
        history.push(`/c/${foundCommunity.name}/submit`);
        setCommunity(foundCommunity);
        setShowDropdown(false);
      }
    }
  };

  return (
    <div
      className="community-selection-input-box"
      onClick={() => setShowDropdown(true)}
    >
      <div className="inner-input-box">
        {inputState === "search" && <BsSearch />}
        {inputState === "choose" && search?.length === 0 && (
          <div className="dotted-circle"></div>
        )}

        {inputState !== "search" &&
          search === communityName &&
          search?.length > 0 && (
            <img
              style={{
                backgroundColor:
                  community?.communitySettings[community?.id]?.baseColor,
              }}
              className="community-dropdown-img"
              alt="Community"
              src={community?.communitySettings?.[community?.id]?.communityIcon}
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
          onBlur={handleBlur}
          className="community-selection-input"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="chevron-down-icon"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <TbChevronDown />
        </button>
      </div>
    </div>
  );
}
