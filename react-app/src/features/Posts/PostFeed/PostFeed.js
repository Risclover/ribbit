import React, { useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SinglePost } from "../..";
import { getCommunities, getPosts } from "../../../store";

export function PostFeed({ posts }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState(() => posts?.slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      requestAnimationFrame(() => {
        setItems((currentItems) => [
          ...currentItems,
          ...posts?.slice(page * 5, page * 5 + 5),
        ]);
        setPage((currentPage) => currentPage + 1);
        setLoading(false);
      });
    }
  }, [loading, page, posts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, loading]);

  // if (!posts || posts?.length === 0) return null;

  return (
    <div>
      {items.map((post, idx) => (
        <NavLink
          data-testid={`post-${idx}`}
          key={post?.id}
          to={`/posts/${post?.id}`}
        >
          <SinglePost id={post?.id} post={post} />
        </NavLink>
      ))}
    </div>
  );
}
