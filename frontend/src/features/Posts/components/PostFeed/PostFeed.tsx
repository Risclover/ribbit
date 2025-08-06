import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { SortingBar } from "@/components/SortingBar";
import { SortKey } from "@/components/SortingBar/SortingBar";
import { PostFormatContext } from "@/context";
import { SinglePostType } from "@/features/NewPosts/components/SinglePostType";
import { getPosts } from "@/store";

interface PostFeedProps {
  posts?: any[];
  sortMode: SortKey;
  setSortMode: (m: SortKey) => void;
  isPage?: string; // "profile" | "feedpage" | "singlepage" …
  community?: boolean;
  pageType?: string; // kept only if you still use it elsewhere
  user?: any;
  isLoaded?: boolean;
  feedType?: string;
}

export const PostFeed = ({
  posts = [],
  sortMode,
  setSortMode,
  isPage,
  community,
  user,
  isLoaded,
  feedType,
}: PostFeedProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { format } = useContext(PostFormatContext);

  /* ---------- derive loading from Redux ----------------- */
  const postsLoaded = useAppSelector((state) => state.posts.loaded);

  /* ---------- pagination state --------------------------- */
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ---------- initial fetch ------------------------------ */
  useEffect(() => {
    if (!postsLoaded) {
      dispatch(getPosts({ limit: 200, offset: (page - 1) * 25 }));
    }
  }, [dispatch, page, postsLoaded]); // NEW dep

  /* ---------- calculate virtualised batch size ----------- */
  const calculatePostsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const heights: Record<string, number> = { Compact: 44, Classic: 91 };
    const postHeight = heights[format] ?? 488; // default Card height
    return Math.ceil(viewportHeight / postHeight) + 2;
  }, [format]);

  /* initial + on‑resize postsPerPage */
  useEffect(() => {
    setPostsPerPage(calculatePostsPerPage());
  }, [calculatePostsPerPage]);

  useEffect(() => {
    const onResize = () => setPostsPerPage(calculatePostsPerPage());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [calculatePostsPerPage]);

  /* ---------- slice list --------------------------------- */
  const items = useMemo(
    () => posts.slice(0, postsPerPage * page),
    [posts, postsPerPage, page]
  );

  /* ---------- infinite scroll ---------------------------- */
  const loadMore = useCallback(() => {
    if (!loading && items.length < posts.length) {
      setLoading(true);
      setTimeout(() => {
        setPage((p) => p + 1);
        setLoading(false);
      }, 1000);
    }
  }, [loading, items.length, posts.length]);

  const onScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.offsetHeight - 500 &&
      !loading &&
      items.length < posts.length
    ) {
      loadMore();
    }
  }, [loadMore, loading, items.length, posts.length]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* ---------- special profile color ---------------------- */
  useEffect(() => {
    if (isPage === "profile") {
      document.documentElement.style.setProperty(
        "--community-highlight",
        "#0079d3"
      );
    }
  }, [isPage]);

  /* ---------- render ------------------------------------- */
  const showSortingBar =
    isPage !== "profile" || (user?.userPosts && user.userPosts > 0);

  return (
    <>
      {showSortingBar && (
        <SortingBar
          sortMode={sortMode}
          setSortMode={setSortMode}
          community={community}
          isPage={isPage}
        />
      )}

      <SinglePostType
        posts={items}
        isPage={isPage}
        format={format}
        postsLoaded={isLoaded} /* ← drives skeleton / no‑posts logic */
        feedType={feedType}
      />
    </>
  );
};
