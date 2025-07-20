import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { removeViewedPosts } from "@/store";
import { getViewedPosts } from "@/store";

export function useRecentlyViewedPosts() {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const arr = [];
      const postList = await dispatch(getViewedPosts());
      postList.ViewedPosts.map((item) => arr.push(item.post));

      console.log("posts.length:", postList);
      setPosts(arr);
    };
    if (posts.length === 0) fetchPosts();
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
