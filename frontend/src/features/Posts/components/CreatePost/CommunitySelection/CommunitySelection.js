import React, { useState, useEffect, useRef, useMemo } from "react";
import { useAppSelector } from "@/store";
import { CommunitySelectionDropdown, CommunitySelectionInput } from ".";
import { useOutsideClick } from "@/hooks";
import "./CommunitySelection.css";

export function CommunitySelection({
  setCommunityId,
  communityId,
  community,
  setCommunity,
}) {
  const wrapperRef = useRef(null);
  const [search, setSearch] = useState(community?.name || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputState, setInputState] = useState("choose");

  const communities = useAppSelector((s) => s.communities);
  const subscriptions = useAppSelector((s) => s.subscriptions);
  const allCommunities = useAppSelector((s) => s.communities);

  useOutsideClick(wrapperRef, () => setShowDropdown(false));

  // keep search text in sync with outside changes to communityId
  useEffect(() => {
    const comm = Object.values(allCommunities).find(
      (c) => c.id === communityId
    );
    if (comm) setSearch(comm.name);
  }, [communityId, allCommunities]);

  // Build list once (memo)
  const communityList = useMemo(
    () =>
      Object.values(allCommunities).map((comm) => ({
        id: comm.id,
        name: comm.name,
        members: comm.members,
        img: comm.communitySettings[comm.id]?.communityIcon,
        communityIcon: comm.communitySettings[comm.id]?.communityIcon,
        bgColor: comm.communitySettings[comm.id]?.baseColor,
      })),
    [allCommunities]
  );

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
