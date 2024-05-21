import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  CommunitySelectionDropdown,
  CommunitySelectionInput,
} from "../CommunitySelection";
import "./CommunitySelection.css";
import { useOutsideClick } from "@/hooks";
import { useParams } from "react-router-dom";

export function CommunitySelection({
  setCommunityId,
  communityId,
  community,
  setCommunity,
}) {
  const wrapperRef = useRef(null);

  const { communityName } = useParams();

  const communities = useSelector((state) => state.communities);
  const subscriptions = useSelector((state) => state.subscriptions);
  const allCommunities = useSelector((state) => state.communities);

  const [search, setSearch] = useState(community?.name);
  const [showDropdown, setShowDropdown] = useState(false);
  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const [inputState, setInputState] = useState("choose");

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  useEffect(() => {
    for (let community of Object.values(allCommunities)) {
      if (community.id === communityId) {
        setSearch(community.name);
      }
    }
  }, [communityId, allCommunities]);

  let communityList = [];
  for (let i = 0; i < Object.values(allCommunities).length; i++) {
    communityList.push({
      img: Object.values(allCommunities)[i].communitySettings[
        Object.values(allCommunities)[i].id
      ].communityIcon,
      name: Object.values(allCommunities)[i].name,
      members: Object.values(allCommunities)[i].members,
      communityIcon:
        Object.values(allCommunities)[i].communitySettings[
          Object.values(allCommunities)[i].id
        ].communityIcon,
      id: Object.values(allCommunities)[i].id,
      bgColor:
        Object.values(allCommunities)[i].communitySettings[
          Object.values(allCommunities)[i].id
        ].baseColor,
    });
  }

  return (
    <div className="community-selection" ref={wrapperRef}>
      <CommunitySelectionInput
        search={search}
        setSearch={setSearch}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
        communityList={communityList}
        communityId={communityId}
        community={community}
        setCommunity={setCommunity}
        setInputState={setInputState}
        inputState={inputState}
      />
      {showDropdown && (
        <CommunitySelectionDropdown
          communityModalOpen={communityModalOpen}
          setCommunityModalOpen={setCommunityModalOpen}
          communityList={communityList}
          search={search}
          setSearch={setSearch}
          communityId={communityId}
          setCommunityId={setCommunityId}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          communities={Object.values(communities)}
          subscriptions={Object.values(subscriptions)}
          community={community}
          setCommunity={setCommunity}
          setInputState={setInputState}
          inputState={inputState}
        />
      )}
    </div>
  );
}
