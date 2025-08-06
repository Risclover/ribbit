import {
  FC,
  useContext,
  useEffect,
  useState,
  MutableRefObject,
  useRef,
} from "react";
import { batch } from "react-redux";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  getPosts,
  addViewedPost,
  getCommunitySettings,
  getCommunities,
} from "@/store";

import {
  NavLink,
  useParams,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import {
  Comments,
  CommunityRulesBox,
  SinglePost,
  CommunityInfoBox,
  useCommunitySettings,
} from "@/features";
import { BackToTop, CommunityImg } from "@/components";
import { PostFormatContext } from "@/context";
import { usePageSettings } from "@/hooks/usePageSettings";
import Skeleton from "@mui/material/Skeleton";
import { useDarkMode } from "@/hooks";
import { FrogLoader } from "@/components/FrogLoader/FrogLoader";

/* ───────────────────────── Types ───────────────────────── */

type Post = RootState["posts"][string];
type Community = RootState["communities"]["communities"][number];

interface RouteParams {
  postId: string;
}

/* ───────────────────────── Component ───────────────────── */

export const SinglePostPage: FC = () => {
  /* -- hooks / helpers -- */
  const { theme } = useDarkMode();
  const history = useHistory();
  const { postId } = useParams<RouteParams>();
  const dispatch = useAppDispatch();
  const { setFormat } = useContext(PostFormatContext);

  /* -- store selectors -- */
  const post: Post | undefined = useAppSelector(
    (s) => s.posts.posts[postId as string]
  );
  const user = useAppSelector((s) => s.session.user);
  const community: Community | undefined = useAppSelector((s) =>
    post ? s.communities.communities[post.community?.id] : undefined
  );
  const postsLoaded = useAppSelector((state) => state.posts.loaded);
  const communitiesLoaded = useAppSelector((state) => state.communities.loaded);

  useCommunitySettings(community);
  /* -- local UI state -- */
  const [scrollToCommentsRequested, setScrollToCommentsRequested] =
    useState(false);
  const [bannerHeight, setBannerHeight] = useState<string>("80px");

  /* ----------------------- Effects ----------------------- */

  /* banner-height (only once) */
  useEffect(() => {
    const h = getComputedStyle(document.documentElement).getPropertyValue(
      "--community-banner-height"
    );
    if (h) setBannerHeight(h);
  }, []);

  /* format + data bootstrap */
  useEffect(() => {
    if (!community?.id) return;
    setFormat("Card");

    if (post) dispatch(addViewedPost(post.id));
  }, [community, post, dispatch, setFormat]);

  useEffect(() => {
    if (!communitiesLoaded) dispatch(getCommunities());
    if (!postsLoaded) dispatch(getPosts());
  }, [dispatch, communitiesLoaded, postsLoaded]);

  /* scroll to #all-comments when hash is present */
  useEffect(() => {
    if (window.location.hash === "#all-comments") {
      document
        .getElementById("all-comments")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  /* ----------------------- Page meta --------------------- */

  usePageSettings({
    documentTitle: post
      ? `${post.title} : ${post.community?.name}`
      : "Ribbit - Splash into anything",
    icon:
      post && community ? (
        <CommunityImg
          imgStyle={{
            backgroundColor:
              community.communitySettings[community.id]?.baseColor ?? "",
          }}
          imgSrc={community.communitySettings[community.id]?.communityIcon}
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
    pageTitle: post ? (
      `c/${post.community?.name}`
    ) : (
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ bgcolor: theme === "dark" && "grey.500" }}
      />
    ),
  });

  /* ----------------------- Early exits ------------------- */
  if (!postsLoaded || !communitiesLoaded) return <FrogLoader />;
  if (!post || !community) return <Redirect to="/404" />;

  const hasCommunityRules =
    Object.values(community.communityRules ?? {}).length > 0;

  /* ----------------------- Render ------------------------ */

  return (
    <div className="single-post-page">
      {/* Banner / link to community */}
      <NavLink to={`/c/${community.name}`}>
        <div className="single-post-page-banner">
          <div className="single-post-page-banner-content-container">
            <div className="single-post-page-banner-content">
              <div
                className="single-post-page-community-icon"
                style={{
                  backgroundImage: `url(${
                    community.communitySettings[community.id].communityIcon
                  }) no-repeat center`,
                }}
              >
                <CommunityImg
                  imgClass={
                    bannerHeight === "80px"
                      ? "single-post-page-community-icon-img"
                      : "single-post-page-community-icon-larger"
                  }
                  imgSrc={
                    community.communitySettings[community.id].communityIcon
                  }
                  imgAlt={`c/${community.name} icon`}
                />
              </div>
              <span
                className="single-post-page-community-name"
                style={{
                  paddingTop: bannerHeight === "80px" ? "4px" : "14px",
                }}
              >
                c/{community.name}
              </span>
            </div>
          </div>
        </div>
      </NavLink>

      {/* Main two-column layout */}
      <div className="single-post-page-main">
        {/* Left column */}
        <div className="single-post-left-col">
          <SinglePost
            link={null}
            id={post.id}
            post={post}
            isPage="singlepage"
            handleCommentsBtnClick={() => setScrollToCommentsRequested(true)}
          />

          <Comments
            triggerScroll={scrollToCommentsRequested}
            setTriggerScroll={setScrollToCommentsRequested}
            post={post}
          />
        </div>

        {/* Right column */}
        <div className="single-post-right-col" id="sidebar">
          <CommunityInfoBox
            user={user}
            community={community}
            isPage="singlepage"
          />

          {hasCommunityRules && <CommunityRulesBox post={post} />}

          <BackToTop />
        </div>
      </div>
    </div>
  );
};
