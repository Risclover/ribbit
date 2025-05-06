import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { SortingBar } from "@/components/SortingBar";
import { PostFormatContext } from "@/context";
import { SinglePostType } from "features/NewPosts/components/SinglePostType";
import { getPosts } from "store";

export const PostFeed = ({
  posts = [],
  sortMode,
  isPage,
  setSortMode,
  community,
  pageType,
  user,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // ─────────── loader flag (only line that really mattered) ────────────
  const [isLoading, setIsLoading] = useState(true);

  // ─────────── keep your pagination / load-more state untouched ────────
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const { format } = useContext(PostFormatContext);

  // ─────────────────────────────────────────────────────────────────────
  //  Fetch *once* and flip isLoading off only when it finishes
  // ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      setIsLoading(true); // skeletons visible immediately
      try {
        await dispatch(getPosts({ limit: 25, offset: (page - 1) * 25 }));
        // wait for thunk to resolve
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  // 🔴———————  THIS useEffect was causing the bug  ————————🔴
  //            It set isLoading(false) before data arrived.
  //            ➜ Remove it, nothing else.
  //
  // useEffect(() => {
  //   setIsLoading(false);
  //   dispatch(getPosts());
  // }, [dispatch]);
  // 🔴——————————————————————————————————————————————🔴

  // ───────────── (everything below is your original code) ──────────────
  const calculatePostsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const heights = { Compact: 44, Classic: 91 };
    const postHeight = heights[format] ?? 488;
    return Math.ceil(viewportHeight / postHeight) + 2;
  }, [format]);

  useEffect(() => {
    const initial = calculatePostsPerPage();
    setPostsPerPage(initial);
  }, [calculatePostsPerPage]);

  useEffect(() => {
    const onResize = () => setPostsPerPage(calculatePostsPerPage());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [calculatePostsPerPage]);

  const items = useMemo(
    () => posts.slice(0, postsPerPage * page),
    [posts, postsPerPage, page]
  );

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

  useEffect(() => {
    if (isPage === "profile") {
      document.documentElement.style.setProperty(
        "--community-highlight",
        "#0079d3"
      );
    }
  }, [isPage]);

  const showSortingBar =
    isPage !== "profile" || (user?.userPosts && user.userPosts > 0);

  return (
    <>
      {showSortingBar && (
        <SortingBar
          sortMode={sortMode}
          setSortMode={setSortMode}
          page={pageType}
          community={community}
          isPage={isPage}
          user={user}
        />
      )}

      <SinglePostType
        posts={items}
        isPage={isPage}
        format={format}
        isLoading={isLoading}
      />
    </>
  );
};
