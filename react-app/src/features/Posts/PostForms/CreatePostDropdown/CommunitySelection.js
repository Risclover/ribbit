import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSubscriptions } from "../../../../store/subscriptions";

import CommunitySelectionDropdown from "./CommunitySelectionDropdown";
import CommunitySelectionInput from "./CommunitySelectionInput";
import "./CommunitySelection.css";

function useOutsideAlerter(
  ref,
  setShowDropdown,
  communityModalOpen,
  setCommunityModalOpen
) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (communityModalOpen) {
        return;
      }
      if (!communityModalOpen) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowDropdown(false);
          setCommunityModalOpen(false);
        }
      } else {
        setCommunityModalOpen(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowDropdown]);
}

export default function CommunitySelection({
  setcommunity_id,
  community_id,
  community,
  setCommunity,
}) {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();

  const communities = useSelector((state) => state.communities);
  const subscriptions = useSelector((state) => state.subscriptions);
  const allCommunities = useSelector((state) => state.communities);

  const [search, setSearch] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const [communityModalOpen, setCommunityModalOpen] = useState(false);

  useOutsideAlerter(
    wrapperRef,
    setShowDropdown,
    communityModalOpen,
    setCommunityModalOpen
  );

  useEffect(() => {
    for (let community of Object.values(allCommunities)) {
      if (community.id === community_id) {
        setSearch(community.name);
      }
    }
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
        communityId={community_id}
      />
      {showDropdown && (
        <CommunitySelectionDropdown
          communityModalOpen={communityModalOpen}
          setCommunityModalOpen={setCommunityModalOpen}
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
          community={community}
          setCommunity={setCommunity}
        />
      )}
    </div>
  );
}
