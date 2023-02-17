import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSubscriptions } from "../../../../store/subscriptions";

import CommunitySelectionDropdown from "./CommunitySelectionDropdown";
import CommunitySelectionInput from "./CommunitySelectionInput";
import "./CommunitySelection.css";

function useOutsideAlerter(ref, setShowDropdown) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function CommunitySelection({ setcommunity_id, community_id }) {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const communities = useSelector((state) => state.communities);
  const subscriptions = useSelector((state) => state.subscriptions);
  const [search, setSearch] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");

  useOutsideAlerter(wrapperRef, setShowDropdown);
  const allCommunities = useSelector((state) => state.communities);

  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  let communityList = [];
  for (let i = 0; i < Object.values(allCommunities).length; i++) {
    communityList.push({
      img: Object.values(allCommunities)[i].communityImg,
      name: Object.values(allCommunities)[i].name,
      members: Object.values(allCommunities)[i].members,
      communityImg: Object.values(allCommunities)[i].communityImg,
      id: Object.values(allCommunities)[i].id,
    });
  }

  return (
    <div className="community-selection" ref={wrapperRef}>
      <CommunitySelectionInput
        search={search}
        setSearch={setSearch}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
        name={name}
        setName={setName}
        communityList={communityList}
      />
      {showDropdown && (
        <CommunitySelectionDropdown
          communityList={communityList}
          setName={setName}
          search={search}
          setSearch={setSearch}
          community_id={community_id}
          setcommunity_id={setcommunity_id}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          communities={Object.values(communities)}
          subscriptions={Object.values(subscriptions)}
        />
      )}
    </div>
  );
}
