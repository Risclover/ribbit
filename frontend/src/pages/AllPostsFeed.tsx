import { ReactElement } from "react";
import {
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "@/layouts";
import {
  CreatePostBar,
  BackToTop,
  PostFeed,
  NoPostsMessage,
} from "@/components";
import { DeveloperLinksBox, AboutBox, RecentlyViewedPosts } from "@/features";
import { usePosts } from "@/features/Posts/hooks/usePosts";
import { usePageSettings } from "@/hooks";
import { AllPostsIcon } from "@/assets";
import "@/features/Posts/Posts.css";
import { useAppSelector } from "@/store";

/* ───────────── local helper type ───────────── */
/* Keep it in-file so we don’t depend on an export
   that may not exist elsewhere. */
type SortKey = "new" | "top";

export function AllPostsFeed(): ReactElement {
  const {
    sortedPosts,
    sortMode: rawSortMode,
    setSortMode,
    user,
    viewedPosts,
  } = usePosts(true);

  const postsLoaded = useAppSelector((state) => state.posts.loaded);

  /* narrow raw string → SortKey (“new” is the default from the hook) */
  const sortMode = (
    ["new", "top"].includes(rawSortMode) ? rawSortMode : "new"
  ) as SortKey;
  const isLoaded = useAppSelector((state) => state.posts.loaded);
  /* highlight colour (unchanged) */
  document.documentElement.style.setProperty(
    "--community-highlight",
    "var(--highlight-color)"
  );

  /* navbar / <head> settings */
  usePageSettings({
    documentTitle: "c/all",
    icon: <AllPostsIcon />,
    pageTitle: "All",
  });

  const hasViewedPosts =
    Object.values(viewedPosts ?? {}).flatMap((p) => p).length > 0;

  return (
    <FeedContainer>
      <FeedLeftColContainer>
        {user && <CreatePostBar isCommunityPage={false} />}
        {
          <PostFeed
            posts={sortedPosts}
            sortMode={sortMode}
            setSortMode={setSortMode as (k: SortKey) => void}
            isPage="feed"
            community={null}
            pageType="all"
            user={user}
            isLoaded={postsLoaded}
            feedType="all"
          />
        }
      </FeedLeftColContainer>

      <FeedRightColContainer>
        <AboutBox
          title="c/All"
          description="The most active posts from all of Ribbit. Come here to see new posts rising and be a part of the conversation."
          user={user}
        />

        {hasViewedPosts && <RecentlyViewedPosts />}

        <div className="last-box-wrapper">
          <DeveloperLinksBox />
          <BackToTop />
        </div>
      </FeedRightColContainer>
    </FeedContainer>
  );
}
