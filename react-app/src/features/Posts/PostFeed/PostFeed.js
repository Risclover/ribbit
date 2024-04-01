import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { SinglePost } from "../SinglePost";

export function PostFeed({ posts, sortMode, isPage, format }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
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

  return (
    <div>
      {items.map((post) => (
        <NavLink key={post.id} to={`/posts/${post.id}`}>
          <SinglePost
            key={post.id}
            id={post.id}
            post={post}
            isPage={isPage}
            format={format}
          />
        </NavLink>
      ))}
    </div>
  );
}
