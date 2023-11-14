import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities } from "../store/communities";
import { getCommunitySettings } from "../store/community_settings";
import { CommunityPageHeader } from "../features/Communities/components/CommunityPageHeader";
import CommunityWelcome from "../features/Communities/CommunityWelcome";
import CommunityPageMain from "../features/Communities/components/CommunityPageMain";

export default function CommunityPage({
  format,
  setFormat,
  setPageTitle,
  setPageIcon,
}) {
  const { communityId } = useParams();
  const dispatch = useDispatch();

  const community = useSelector((state) => state.communities[communityId]);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getCommunitySettings(communityId));
  }, []);

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

  console.log("Community:", community);

  if (!community) return null;

  return (
    <div className="community-page-container">
      <CommunityPageHeader community={community} />
      <CommunityPageMain
        format={format}
        setFormat={setFormat}
        community={community}
      />
      {/* <CommunityWelcome /> */}
    </div>
  );
}
