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
import { getIdFromName } from "utils/getCommunityIdFromName";
import { CommunityImg } from "components/CommunityImg";

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

  const communityId = getIdFromName(communityName, communities);

  const community = useSelector((state) => state.communities[communityId]);

  usePageSettings({
    documentTitle: community?.displayName,
    icon: (
      <CommunityImg
        imgStyle={{
          backgroundColor: `${
            community?.communitySettings[community?.id].baseColor
          }`,
        }}
        imgSrc={community?.communitySettings[community?.id].communityIcon}
        imgClass="nav-left-dropdown-item-icon item-icon-circle"
        imgAlt="Community"
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
