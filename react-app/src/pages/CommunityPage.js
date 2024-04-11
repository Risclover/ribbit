import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCommunities, getCommunitySettings, getPosts } from "../store";

import {
  CommunityPageMain,
  CommunityPageHeader,
  CommunityWelcome,
} from "../features";
import { usePageSettings } from "../hooks/usePageSettings";

export function CommunityPage() {
  // const { communityId } = useParams();
  const { communityName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getCommunitySettings(communityId));
    dispatch(getPosts());
  }, [dispatch]);

  const communities = useSelector((state) => state.communities);

  const getIdFromName = (name) => {
    let result = Object.values(communities).find(
      (community) => community.name === name
    );
    return result ? result.id : null;
  };

  const communityId = getIdFromName(communityName);

  const community = useSelector((state) => state.communities[communityId]);

  usePageSettings({
    documentTitle: community?.displayName,
    icon: (
      <img
        style={{
          backgroundColor: `${
            community?.communitySettings[community?.id].baseColor
          }`,
        }}
        src={community?.communitySettings[community?.id].communityIcon}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="Community"
      />
    ),
    pageTitle: `c/${community?.name}`,
  });

  if (!community || !communities) return null;

  return (
    <div className="community-page-container">
      <CommunityPageHeader community={community} />
      <CommunityPageMain community={community} />
      {/* <CommunityWelcome /> */}
    </div>
  );
}
