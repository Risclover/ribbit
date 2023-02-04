import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbChevronDown } from "react-icons/tb";
import { BsSearch } from "react-icons/bs";
import "./CommunitySelection.css";

import { getCommunities } from "../../../../store/communities";

export default function CommunitySelectionInput({
  communityId,
  showDropdown,
  setShowDropdown,
  setcommunity_id,
  search,
  setSearch,
  name,
  setName,
}) {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [commList, setCommList] = useState([]);
  const [inputState, setInputState] = useState("choose");

  const communities = useSelector((state) => state.communities);
  const community = useSelector((state) => state.communities[communityId]);

  let list = Object.values(communities).map((community) => community.name);

  useEffect(() => {
    setCommList(list);
    console.log(commList);
  }, [communities]);

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
    console.log(showDropdown);
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
    console.log(showDropdown);
    name.length > 0 && setShowDropdown(true);
  };

  return (
    <div className="community-selection-input-box">
      {inputState === "choose" && (
        <div className="inner-input-box">
          <div className="dotted-circle"></div>
          <p
            className="community-selection-input-txt"
            onClick={async () => {
              setInputState("search");
            }}
          >
            Choose a community
          </p>
        </div>
      )}
      {inputState === "search" && (
        <div className="inner-input-box">
          <BsSearch />
          <input
            type="text"
            placeholder="Search communities"
            className="community-selection-input"
            autoFocus
            onBlur={() => {
              name === "" && setInputState("choose");
              name.length > 0 ? setShowDropdown(true) : setShowDropdown(false);
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowDropdown(true);
            }}
            value={name}
            onFocus={handleOpen}
          />
        </div>
      )}
      <button className="chevron-down-icon" onClick={handleClick}>
        <TbChevronDown />
      </button>
    </div>
  );
}
