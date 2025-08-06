import { useEffect, useState, JSX } from "react";
import { Redirect, useParams } from "react-router-dom";
import { shallowEqual } from "react-redux";
import Skeleton from "@mui/material/Skeleton";

import {
  useAppDispatch,
  useAppSelector,
  RootState,
  getCommunities,
  getCommunitySettings,
  getPosts,
} from "@/store";

import {
  CommunityPageHeader,
  CommunityPosts,
  CommunityInfoBox,
  CommunityRulesBox,
} from "@/features";

import {
  BackToTop,
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
  CommunityImg,
} from "@/components";

import { usePageSettings } from "@/hooks/usePageSettings";
import { useDarkMode } from "@/hooks";
import { getIdFromName } from "@/utils/getCommunityIdFromName";
import { AllPostsIcon } from "@/assets";

import "../features/Posts/Posts.css";
import { FrogLoader } from "@/components/FrogLoader/FrogLoader";

/* ------------ Types pulled from store models ------------ */
type Community = RootState["communities"][number];
type Post = RootState["posts"][number];

/* ======================================================== */

export function CommunityPage(): JSX.Element {
  /* -------- hooks & params -------- */
  const { theme } = useDarkMode();
  const { communityName } = useParams<{ communityName: string }>();
  const dispatch = useAppDispatch();

  /* -------- store selectors -------- */
  const user = useAppSelector((s) => s.session.user);
  const communities = useAppSelector((s) => s.communities.communities);
  const communityId = getIdFromName(communityName, communities);
  const community: Community | undefined = communities[communityId];

  const communityPosts = useAppSelector(
    (s) =>
      Object.values<Post>(s.posts.posts).filter(
        (p) => p.community?.id === communityId
      ),
    shallowEqual
  );

  const communitiesLoaded = useAppSelector((s) => s.communities.loaded);

  /* -------- local UI state -------- */
  const [showAbout, setShowAbout] = useState<boolean>(false);

  const postsLoaded = useAppSelector((state) => state.posts.loaded);

  /* -------- fetch data -------- */
  useEffect(() => {
    if (!communityId) return;

    (async () => {
      if (!communitiesLoaded) await dispatch(getCommunities());
      await dispatch(getCommunitySettings(communityId));

      if (!postsLoaded) {
        await dispatch(getPosts());
      }
    })();
  }, [communityId, dispatch, communityPosts.length]);

  /* -------- store recent communities for guests -------- */
  useEffect(() => {
    if (!user && community) {
      const LOCAL_KEY = "recentCommunities";
      const stored: any[] = JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");

      const filtered = stored.filter((c) => c.id !== community?.id);
      filtered.unshift({
        id: community?.id,
        name: community?.name,
        icon: community?.communitySettings[community?.id].communityIcon,
        iconBgColor: community?.communitySettings[community?.id].baseColor,
      });

      localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered.slice(0, 5)));
    }
  }, [community, user]);

  useEffect(() => {
    console.log("community:", community);
  }, [community]);

  /* -------- document / favicon -------- */
  usePageSettings({
    documentTitle: community?.displayName,
    icon: community ? (
      <CommunityImg
        imgStyle={{
          backgroundColor:
            community?.communitySettings[community?.id].baseColor,
        }}
        imgSrc={community?.communitySettings[community?.id].communityIcon}
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
      `c/${community?.name}`
    ) : (
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ bgcolor: theme === "dark" && "grey.500" }}
      />
    ),
  });

  /* -------- early exits -------- */
  if (!communitiesLoaded) return <FrogLoader />;
  if (!community) return <Redirect to="/404" />;

  /* -------- render -------- */
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
          {showAbout ? (
            <>
              <CommunityInfoBox community={community} user={user} />
              {Object.values(community?.communityRules).length > 0 && (
                <CommunityRulesBox community={community} />
              )}
            </>
          ) : (
            <CommunityPosts
              commPosts={communityPosts}
              communityName={community?.name}
              user={user}
            />
          )}
        </FeedLeftColContainer>

        <FeedRightColContainer>
          <CommunityInfoBox user={user} community={community} />

          {Object.values(community?.communityRules).length > 0 && (
            <CommunityRulesBox community={community} />
          )}

          <BackToTop community />
        </FeedRightColContainer>
      </FeedContainer>
    </div>
  );
}
