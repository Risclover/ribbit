// useRecentlyViewedPosts.tsx
import React, { useEffect, useState } from "react";
import { clearViewedPosts, useAppDispatch } from "@/store";
import { removeViewedPosts, getViewedPosts } from "@/store";

export function useRecentlyViewedPosts() {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const result = await dispatch(getViewedPosts());
        // Be defensive about the shape
        const list = result?.ViewedPosts ?? [];
        const arr = list.map((item: any) => item.post).filter(Boolean);
        if (!cancelled) setPosts(arr);
      } catch (e) {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const handleClear = async () => {
    try {
      await fetch("/api/viewed_posts/delete", { method: "DELETE" });
      dispatch(clearViewedPosts());
      setPosts([]); // reflect immediately in the widget
    } catch (error) {
      console.error(error);
    }
  };

  return { isLoading, handleClear, posts };
}
