import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommunities, getCommunitySettings, getPosts } from "../store";

import {
  CommunityPageHeader,
  CommunityPosts,
  CommunityInfoBox,
  CommunityRulesBox,
} from "../features";
import { usePageSettings } from "../hooks/usePageSettings";
import { getIdFromName } from "@/utils/getCommunityIdFromName";
import { CommunityImg } from "@/components/CommunityImg";
import Skeleton from "@mui/material/Skeleton";
import {
  BackToTop,
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "@/components";
import { useDarkMode } from "@/hooks";

export function CommunityPage() {
  const { theme } = useDarkMode();

  const { communityName } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const communities = useSelector((state) => state.communities);
  const communityId = getIdFromName(communityName, communities);
  const community = useSelector((state) => state.communities[communityId]);
  const posts = useSelector((state) => Object.values(state.posts));
  const communityPosts = posts.filter(
    (post) => post.communityId === community?.id
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getCommunities());
      setLoading(false);
      await dispatch(getCommunitySettings(communityId));
      if (posts.length === 0) {
        await dispatch(getPosts());
      }
    };
    getData();
  }, [communityId, dispatch]);

  useEffect(() => {
    if (!user) {
      const LOCAL_STORAGE_KEY = "recentCommunities";

      let stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

      stored = stored.filter((c) => c.id !== community?.id);

      stored.unshift({
        id: community?.id,
        name: community?.name,
        icon: community?.communitySettings[community?.id].communityIcon,
        iconBgColor: community?.communitySettings[community.id].baseColor,
      });

      if (stored.length > 5) {
        stored.pop();
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stored));
    }
  }, [community, user]);

  usePageSettings({
    documentTitle: community?.displayName,
    icon:
      community !== undefined ? (
        <CommunityImg
          imgStyle={{
            backgroundColor: `${
              community?.communitySettings[community?.id]?.baseColor
            }`,
          }}
          imgSrc={community?.communitySettings[community?.id]?.communityIcon}
          imgClass="nav-left-dropdown-item-icon item-icon-circle"
          imgAlt="Community"
        />
      ) : (
        <Skeleton
          variant="circular"
          animation="wave"
          width={20}
          height={20}
          sx={{ bgcolor: theme === "dark" && "grey.500" }}
        />
      ),
    pageTitle:
      community !== undefined ? (
        `c/${community?.name}`
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ bgcolor: theme === "dark" && "grey.500" }}
        />
      ),
  });
  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }
  if (!community) {
    return <Redirect to="/404" />;
  }

  return (
    <div className="community-page-container">
      <CommunityPageHeader community={community} />
      <FeedContainer>
        <div className="community-body-bg-div"></div>
        <FeedLeftColContainer>
          <CommunityPosts
            commPosts={communityPosts}
            communityName={community.name}
            user={user}
          />
        </FeedLeftColContainer>
        <FeedRightColContainer>
          <CommunityInfoBox user={user} community={community} />

          {Object.values(community.communityRules).length > 0 && (
            <CommunityRulesBox community={community} />
          )}

          <BackToTop community={true} />
        </FeedRightColContainer>
      </FeedContainer>
      {/* <CommunityWelcome /> */}
    </div>
  );
}
