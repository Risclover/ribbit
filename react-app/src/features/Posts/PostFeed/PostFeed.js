import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SinglePost } from "../SinglePost";
import { getCommunities, getPosts } from "../../../store";
import { SortingFunction } from "../utils";

export function PostFeed({ posts, sortMode }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
  }, [dispatch]);

  useEffect(() => {
    // Initialize or reset items on posts or sortMode change
    setItems(posts.slice(0, 10 * page));
  }, [posts, page, sortMode]);

  const loadMore = () => {
    if (!loading && items.length < posts.length) {
      setLoading(true);
      setTimeout(() => {
        setPage(page + 1);
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !loading &&
        items.length < posts.length
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, loading, posts.length]);

  if (!posts) return null;

  return (
    <div>
      {items.map((post) => (
        <NavLink key={post.id} to={`/posts/${post.id}`}>
          <SinglePost key={post.id} id={post.id} post={post} />
        </NavLink>
      ))}
      {loading && <div>Loading more posts...</div>}
    </div>
  );
}
