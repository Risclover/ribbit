import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { TbChevronDown } from "react-icons/tb";
import { CommunityImg } from "@/components/CommunityImg";
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

  // Focus input whenever dropdown opens
  useEffect(() => {
    if (showDropdown) inputRef.current?.focus();
  }, [showDropdown]);

  // ----- FOCUS / BLUR -----
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
    // If nothing typed AND dropdown is closed, reset to /submit
    if (search.trim() === "" && !showDropdown) {
      setCommunity(null);
      history.push("/submit");
    }
  };

  // ----- initial community -----
  useEffect(() => {
    if (communityId) {
      const initial = communities.find((c) => c.id === communityId);
      if (initial) setCommunity(initial);
    }
  }, [communityId, communities, setCommunity]);

  // ----- ENTER key (quick select) -----
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const found = communities.find((c) => c.name === e.target.value);
      if (found) {
        history.push(`/c/${found.name}/submit`);
        setCommunity(found);
        setShowDropdown(false);
      }
    }
  };

  // ----- render -----
  return (
    <div
      className="community-selection-input-box"
      onClick={() => setShowDropdown(true)}
    >
      <div className="inner-input-box">
        {inputState === "search" && <BsSearch />}
        {inputState === "choose" && !search && (
          <div className="dotted-circle" />
        )}

        {inputState !== "search" && search === communityName && search && (
          <CommunityImg
            imgStyle={{
              backgroundColor:
                community?.communitySettings[community?.id]?.baseColor,
            }}
            imgClass="community-dropdown-img"
            imgAlt="Community"
            imgSrc={
              community?.communitySettings?.[community?.id]?.communityIcon
            }
          />
        )}

        {search && <span className="community-selection-span">c/</span>}

        <input
          ref={inputRef}
          type="text"
          placeholder={
            inputState === "search"
              ? "Search communities"
              : "Choose a community"
          }
          className="community-selection-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        />

        <button
          aria-label="Open communities dropdown"
          type="button"
          className="chevron-down-icon"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <TbChevronDown />
        </button>
      </div>
    </div>
  );
}
