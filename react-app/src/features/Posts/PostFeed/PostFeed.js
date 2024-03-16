import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SinglePost } from "../..";
import { getCommunities, getPosts } from "../../../store";

export function PostFeed({ posts }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState(posts.slice(10, 15));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
  }, [dispatch]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems([...items, ...posts.slice(page * 5, page * 5 + 5)]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      loadMore();
    }
  };

  setTimeout(() => {
    setLoader(false);
  }, 3000);

  if (!posts) return null;

  return (
    <div>
      {posts.slice(0, 10).map((post) => (
        <NavLink key={post.id} to={`/posts/${post.id}`}>
          <SinglePost key={post.id} id={post.id} post={post} />
        </NavLink>
      ))}
    </div>
  );
}
