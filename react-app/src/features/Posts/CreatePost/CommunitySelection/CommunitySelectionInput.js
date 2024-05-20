import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";
import { TbChevronDown } from "react-icons/tb";
import "./CommunitySelection.css";
import { useHistory, useParams } from "react-router-dom";

export function CommunitySelectionInput({
  setShowDropdown,
  search,
  setSearch,
  communityId,
  community,
  communityList,
  setCommunity,
}) {
  const { communityName } = useParams();
  console.log("communityName:", communityName);
  const history = useHistory();
  const [inputState, setInputState] = useState("choose");
  const communitySettings = useSelector((state) =>
    communityId
      ? state.communities[communityId]?.communitySettings[communityId]
      : null
  );

  const communities = useSelector((state) => Object.values(state.communities));

  const handleFocus = () => {
    setInputState("search");
    setShowDropdown(true);
  };

  useEffect(() => {
    if (inputState === "choose" && search === "") {
      setCommunity(null);
      history.push("/submit");
    }
  }, [inputState, search, history, community]);

  useEffect(() => {
    // If there's a communityId, find and set the initial community
    if (communityId) {
      const initialCommunity = communities.find((c) => c.id === communityId);
      if (initialCommunity) {
        setCommunity(initialCommunity);
        setSearch(initialCommunity.name);
      }
    }
  }, [communityId, communities]);

  console.log("communityId:", communityId);

  return (
    <div
      className="community-selection-input-box"
      onClick={() => setShowDropdown(true)}
    >
      <div className="inner-input-box">
        {inputState === "search" && <BsSearch />}
        {inputState !== "search" &&
          inputState === "choose" &&
          search !== communityName && <div className="dotted-circle"></div>}

        {inputState !== "search" &&
          search === communityName &&
          search?.length > 0 && (
            <img
              style={{
                backgroundColor:
                  community?.communitySettings[community?.id].baseColor,
              }}
              className="community-dropdown-img"
              alt="Community"
              src={community?.communitySettings?.[community?.id].communityIcon}
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const foundCommunity = communities.find(
                (comm) => comm.name === e.target.value
              );
              if (foundCommunity) {
                history.push(`/c/${foundCommunity.name}/submit`);
                setCommunity(foundCommunity);
              }
            }
          }}
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
