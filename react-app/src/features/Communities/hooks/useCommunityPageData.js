import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getCommunities, getCommunitySettings, getPosts } from "@/store";
import { getIdFromName } from "@/utils/getCommunityIdFromName";
import { PageTitleContext } from "@/context";
import { CommunityImg } from "@/components/CommunityImg";
import Skeleton from "@mui/material/Skeleton";
import { useDarkMode } from "@/hooks";

/**
 * Single hook that:
 * 1) Reads `communityName` from URL params
 * 2) Dispatches calls to fetch communities, community settings, and posts
 * 3) Derives the current community and its posts
 * 4) Sets the page settings (document.title, page icon, etc.) once the community is known
 */
export function useCommunityPage() {
  const { theme } = useDarkMode();
  const { communityName } = useParams();
  const dispatch = useDispatch();

  const { setPageTitle, setPageIcon } = useContext(PageTitleContext);

  const communities = useSelector((state) => state.communities);
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));

  // 1) Derive communityId from the name
  const communityId = getIdFromName(communityName, communities);
  const community = communities[communityId];

  // 2) Fetch data
  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
    if (communityId) {
      dispatch(getCommunitySettings(communityId));
    }
  }, [dispatch, communityId]);

  // 3) Filter posts for this community
  const communityPosts = community
    ? posts.filter((post) => post.communityId === community.id)
    : [];

  // 4) Build dynamic title/icon
  //    For the top-left “page title” in your nav, or wherever you display it
  const pageTitle = community ? `c/${community.name}` : "Loading community...";
  // Build an icon or fallback
  const pageIcon = community ? (
    <CommunityImg
      imgStyle={{
        backgroundColor: community?.communitySettings[community?.id]?.baseColor,
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
  );

  // 5) Use an effect to set the document.title and context-based “pageTitle” or “pageIcon”
  useEffect(() => {
    // Document title (the browser tab)
    document.title = community?.displayName || "Community";

    // PageTitleContext controls top-left nav or wherever you show these
    setPageTitle(<span className="nav-left-dropdown-item">{pageTitle}</span>);
    setPageIcon(pageIcon);
  }, [community, pageTitle, pageIcon, setPageTitle, setPageIcon]);

  // 6) Return any data the parent needs
  return {
    community,
    communityId,
    communityPosts,
    communities,
    user,
  };
}
