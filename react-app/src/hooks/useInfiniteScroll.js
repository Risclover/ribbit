import { useState, useEffect } from "react";

const useInfiniteScroll = (fetchFunc) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading ||
      !hasMore
    ) {
      return;
    }

    setLoading(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchMoreData = async () => {
      try {
        const newPosts = await fetchFunc(page);
        setPage(page + 1);
        setLoading(false);
        if (newPosts.length === 0) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (loading) {
      fetchMoreData();
    }
  }, [loading, page, fetchFunc]);

  return [hasMore, loading];
};

export default useInfiniteScroll;
