import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { SinglePost } from "@/features";
import { SortingBar } from "../SortingBar";

export const PostFeed = ({
  posts = [],
  sortMode,
  isPage,
  format,
  setSortMode,
  community,
  pageType,
  user,
}) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const items = useMemo(() => posts.slice(0, 10 * page), [posts, page]);

  const handlePostClick = useCallback(
    (postId) => (e) => {
      e.stopPropagation();
      history.push(`/posts/${postId}`);
    },
    [history]
  );

  const loadMore = useCallback(() => {
    if (!loading && items.length < posts.length) {
      setLoading(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      }, 1000);
    }
  }, [loading, items.length, posts.length]);

  const handleScroll = useCallback(() => {
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
    <div>
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
      {items.map((post) => (
        <div key={post.id} onClick={handlePostClick(post.id)}>
          <SinglePost
            id={post.id}
            post={post}
            isPage={isPage}
            format={format}
          />
        </div>
      ))}
    </div>
  );
};
