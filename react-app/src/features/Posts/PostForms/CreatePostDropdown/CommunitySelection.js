import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCommunities } from "../../../../store/communities";
import { getSubscriptions } from "../../../../store/subscriptions";

import CommunitySelectionDropdown from "./CommunitySelectionDropdown";
import CommunitySelectionInput from "./CommunitySelectionInput";
import "./CommunitySelection.css";

export default function CommunitySelection({ setcommunity_id, community_id }) {
  const dispatch = useDispatch();

  const communities = useSelector((state) => state.communities);
  const subscriptions = useSelector((state) => state.subscriptions);
  const [search, setSearch] = useState();
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    dispatch(getSubscriptions());
    console.log("dropdown:", showDropdown);
  }, []);

  return (
    <div className="community-selection">
      <CommunitySelectionInput
        search={search}
        setSearch={setSearch}
        setShowDropdown={setShowDropdown}
        showDropdown={showDropdown}
        name={name}
        setName={setName}
      />
      {showDropdown && (
        <CommunitySelectionDropdown
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
