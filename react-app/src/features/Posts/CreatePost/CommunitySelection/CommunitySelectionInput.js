import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { TbChevronDown } from "react-icons/tb";

import { CommunityImg } from "components/CommunityImg";
import "./CommunitySelection.css";

export function CommunitySelectionInput({
  setShowDropdown,
  showDropdown,
  search,
  setSearch,
  communityId,
  community,
  setCommunity,
  setInputState,
  inputState,
}) {
  const inputRef = useRef(null);
  const { communityName } = useParams();
  const history = useHistory();

  const communities = useSelector((state) => Object.values(state.communities));

  useEffect(() => {
    if (showDropdown) {
      inputRef.current.focus();
    }
  }, [showDropdown]);

  const handleFocus = (e) => {
    setInputState("search");
    setShowDropdown(true);
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length
    );
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
            <CommunityImg
              imgStyle={{
                backgroundColor: `${
                  community?.communitySettings[community?.id]?.baseColor
                }`,
              }}
              imgClass="community-dropdown-img"
              imgAlt="Community"
              imgSrc={
                community?.communitySettings?.[community?.id]?.communityIcon
              }
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
          onFocus={(e) => handleFocus(e)}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
        <button
          aria-label="Open communities dropdown"
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
