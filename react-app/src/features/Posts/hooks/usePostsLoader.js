import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

export const usePostsLoader = (fetchActions, initialPosts, sortFunction) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  // Fetching initial data
  useEffect(() => {
    fetchActions.forEach((action) => dispatch(action()));
  }, [dispatch, fetchActions]);

  // Load more posts
  const loadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setItems((currentItems) => [
          ...currentItems,
          ...initialPosts.slice(page * 5, page * 5 + 5),
        ]);
        setPage((currentPage) => currentPage + 1);
        setLoading(false);
      }, 1000);
    }
  }, [loading, page, initialPosts]);

  useEffect(() => {
    sortFunction(items);
  }, [items, sortFunction]);

  return { items, loading, loadMore };
};
