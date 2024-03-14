import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCommunities, getCommunitySettings } from "../store";

import {
  CommunityPageMain,
  CommunityPageHeader,
  CommunityWelcome,
} from "../features";
import { PageTitleContext } from "../context";

export function CommunityPage({ setPageIcon }) {
  const { setPageTitle } = useContext(PageTitleContext);
  // const { communityId } = useParams();
  const { communityName } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getCommunitySettings(communityId));
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

  useEffect(() => {
    document.title = community?.displayName;
    setPageIcon(
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
    );
    setPageTitle(
      <span className="nav-left-dropdown-item">c/{community?.name}</span>
    );
  }, [community, setPageTitle, setPageIcon]);

  if (!community || !communities) return null;

  return (
    <div className="community-page-container">
      <CommunityPageHeader community={community} />
      <CommunityPageMain community={community} />
      {/* <CommunityWelcome /> */}
    </div>
  );
}
