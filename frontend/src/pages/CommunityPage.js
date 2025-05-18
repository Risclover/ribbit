import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getCommunities, getCommunitySettings, getPosts } from "@/store";

import {
  CommunityPageHeader,
  CommunityPosts,
  CommunityInfoBox,
  CommunityRulesBox,
} from "@/features";

import { usePageSettings } from "@/hooks/usePageSettings";
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

  /* ---------------- data from store ---------------- */
  const user = useSelector((s) => s.session.user);
  const communities = useSelector((s) => s.communities);
  const communityId = getIdFromName(communityName, communities);
  const community = communities[communityId];

  /** Only this community’s posts, memoised & shallow-compared */
  const communityPosts = useSelector(
    (s) =>
      Object.values(s.posts).filter((p) => p.community?.id === communityId),
    shallowEqual
  );

  const communitiesLoaded = useSelector(
    (s) => Object.keys(s.communities).length > 0
  );

  /* ---------------- local ui state ---------------- */
  const [loading, setLoading] = useState(true);
  const [showAbout, setShowAbout] = useState(false);

  /* ---------------- data fetch ---------------- */
  useEffect(() => {
    (async () => {
      await dispatch(getCommunities());
      await dispatch(getCommunitySettings(communityId));

      // Only fetch posts once per fresh visit
      if (communityPosts.length === 0) {
        await dispatch(getPosts());
      }

      setLoading(false);
    })();
  }, [communityId, dispatch]); // posts selector memo ensures no infinite loop

  /* store recent communities for guests */
  useEffect(() => {
    if (!user && community) {
      const LOCAL_KEY = "recentCommunities";
      let stored = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];

      stored = stored.filter((c) => c.id !== community.id);
      stored.unshift({
        id: community.id,
        name: community.name,
        icon: community.communitySettings[community.id].communityIcon,
        iconBgColor: community.communitySettings[community.id].baseColor,
      });

      if (stored.length > 5) stored.pop();
      localStorage.setItem(LOCAL_KEY, JSON.stringify(stored));
    }
  }, [community, user]);

  /* ---------------- document / favicon ---------------- */
  usePageSettings({
    documentTitle: community?.displayName,
    icon: community ? (
      <CommunityImg
        imgStyle={{
          backgroundColor:
            community?.communitySettings[community.id]?.baseColor,
        }}
        imgSrc={community?.communitySettings[community.id]?.communityIcon}
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
    pageTitle: community ? (
      `c/${community.name}`
    ) : (
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ bgcolor: theme === "dark" && "grey.500" }}
      />
    ),
  });

  /* ---------------- early returns ---------------- */
  if (loading || !communitiesLoaded) return <div>Loading…</div>;
  if (!community) return <Redirect to="/404" />;

  /* ---------------- render ---------------- */
  return (
    <div className="community-page-container">
      <CommunityPageHeader
        community={community}
        showAbout={showAbout}
        setShowAbout={setShowAbout}
      />

      <FeedContainer>
        <div className="community-body-bg-div" />

        <FeedLeftColContainer>
          {!showAbout ? (
            <CommunityPosts
              commPosts={communityPosts}
              communityName={community.name}
              user={user}
            />
          ) : (
            <>
              <CommunityInfoBox community={community} user={user} />
              {Object.values(community.communityRules).length > 0 && (
                <CommunityRulesBox community={community} />
              )}
            </>
          )}
        </FeedLeftColContainer>

        <FeedRightColContainer>
          <CommunityInfoBox user={user} community={community} />

          {Object.values(community.communityRules).length > 0 && (
            <CommunityRulesBox community={community} />
          )}

          <BackToTop community />
        </FeedRightColContainer>
      </FeedContainer>
    </div>
  );
}
