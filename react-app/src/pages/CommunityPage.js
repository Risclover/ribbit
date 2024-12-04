import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities, getCommunitySettings, getPosts } from "../store";

import { CommunityPageMain, CommunityPageHeader } from "../features";
import { usePageSettings } from "../hooks/usePageSettings";
import { getIdFromName } from "utils/getCommunityIdFromName";
import { CommunityImg } from "components/CommunityImg";
import Skeleton from "@mui/material/Skeleton";

export function CommunityPage() {
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
    icon:
      community !== undefined ? (
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
      ) : (
        <Skeleton variant="circular" animation="wave" width={20} height={20} />
      ),
    pageTitle:
      community !== undefined ? (
        `c/${community?.name}`
      ) : (
        <Skeleton animation="wave" variant="text" />
      ),
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
