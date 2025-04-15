import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeViewedPosts } from "@/store";
import { getViewedPosts } from "@/store";

export function useRecentlyViewedPosts() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const arr = [];
      const postList = await dispatch(getViewedPosts());
      postList.ViewedPosts.map((item) => arr.push(item.post));

      setPosts(arr);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [posts]);

  const handleClear = () => {
    fetch("/api/viewed_posts/delete", { method: "DELETE" })
      .then(() => {
        dispatch(removeViewedPosts());
      })
      .catch((error) => console.error(error));
  };

  return { isLoading, handleClear, posts };
}
