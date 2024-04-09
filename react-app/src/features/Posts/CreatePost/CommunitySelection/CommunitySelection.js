import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { CommunitySelectionDropdown, CommunitySelectionInput } from "../../..";
import "./CommunitySelection.css";
import { useOutsideClick } from "../../../../hooks";

export function CommunitySelection({
  setcommunity_id,
  community_id,
  community,
  setCommunity,
}) {
  const wrapperRef = useRef(null);

  const communities = useSelector((state) => state.communities);
  const subscriptions = useSelector((state) => state.subscriptions);
  const allCommunities = useSelector((state) => state.communities);

  const [search, setSearch] = useState(
    Object.values(allCommunities).find((comm) =>
      comm.id === community_id ? community.name : ""
    )
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const [communityModalOpen, setCommunityModalOpen] = useState(false);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  useEffect(() => {
    for (let community of Object.values(allCommunities)) {
      if (community.id === community_id) {
        setSearch(community.name);
      }
    }
  }, [community_id, allCommunities]);

  let communityList = [];
  for (let i = 0; i < Object.values(allCommunities).length; i++) {
    communityList.push({
      img: Object.values(allCommunities)[i].communitySettings[
        Object.values(allCommunities)[i].id
      ].communityIcon,
      name: Object.values(allCommunities)[i].name,
      members: Object.values(allCommunities)[i].members,
      communityIcon: community?.communitySettings[community?.id].communityIcon,
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
        name={name}
        setName={setName}
        communityList={communityList}
        communityId={community_id}
        community={community}
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
