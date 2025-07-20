import { useState } from "react";
import { usePageSettings } from "@/hooks";
import {
  BackToTop,
  CreatePostBar,
  FeedRightColContainer,
  NoPostsMessage,
  PostFeed,
  SortKey,
} from "@/components";
import { FeedContainer, FeedLeftColContainer } from "@/layouts";
import {
  AboutBox,
  DeveloperLinksBox,
  RecentlyViewedPosts,
  usePosts,
} from "@/features";
import { HomeIcon } from "@/assets";
import { useAppSelector, RootState } from "@/store";

import "@/features/Posts/Posts.css";

/* ---------- selector + types ---------- */
const selectSubscriptions = (s: RootState) => Object.values(s.subscriptions);
type Subscriptions = ReturnType<typeof selectSubscriptions>;
type ViewedPosts = Record<string, unknown[]>;

/* ---------- component ---------- */
export function HomepageFeed(): JSX.Element {
  const subscriptions: Subscriptions = useAppSelector(selectSubscriptions);
  const followerPosts = useAppSelector((s) => Object.values(s.followers.posts));

  const { sortedPosts, sortMode, setSortMode, user, viewedPosts } =
    usePosts(false);

  const [isLoading] = useState<boolean>(false);

  /* highlight colour */
  document.documentElement.style.setProperty(
    "--community-highlight",
    "var(--highlight-color)"
  );

  /* page-meta */
  usePageSettings({
    documentTitle: "Ribbit - Splash into anything",
    icon: <HomeIcon />,
    pageTitle: "Home",
  });

  /* ---------- render ---------- */
  return (
    <FeedContainer>
      <FeedLeftColContainer>
        <CreatePostBar isCommunityPage={false} />

        {!isLoading &&
        subscriptions.length === 0 &&
        followerPosts.length === 0 ? (
          <NoPostsMessage type="homepage" />
        ) : (
          sortedPosts.length > 0 && (
            <PostFeed
              posts={sortedPosts}
              /* ✨ cast to the stricter union type expected by PostFeed */
              sortMode={sortMode as SortKey}
              setSortMode={setSortMode as (m: SortKey) => void}
              isPage="feedpage"
              community={undefined}
              pageType="home"
              user={user}
            />
          )
        )}
      </FeedLeftColContainer>

      <FeedRightColContainer>
        <AboutBox
          title="Home"
          description="Your personal Ribbit front-page. Come here to check in with your favourite communities."
          user={user}
        />

        {viewedPosts &&
          Object.values(viewedPosts as ViewedPosts).flatMap((p) => p).length >
            0 && <RecentlyViewedPosts />}

        <div className="last-box-wrapper">
          <DeveloperLinksBox />
          <BackToTop />
        </div>
      </FeedRightColContainer>
    </FeedContainer>
  );
}
