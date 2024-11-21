import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { useHistory } from "react-router-dom";
import { SinglePost } from "@/features";
import { SortingBar } from "../../../../components/SortingBar";
import { PostFormatContext } from "context";

export const PostFeed = ({
  posts = [],
  sortMode,
  isPage,
  setSortMode,
  community,
  pageType,
  user,
}) => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(0); // Default value
  const [loading, setLoading] = useState(false);

  const { format, setFormat } = useContext(PostFormatContext);

  useEffect(() => {
    console.log("format:", format);
  }, [format]);
  // Function to calculate posts per page based on format
  const calculatePostsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    let postHeight;

    // Set approximate post height based on format
    switch (format) {
      case "Compact":
        postHeight = 44; // Adjust this value based on actual height
        break;
      case "Classic":
        postHeight = 91; // Adjust this value based on actual height
        break;
      default:
        // For 'card' or other formats
        postHeight = 488; // Adjust this value based on actual height
        break;
    }

    // Calculate the number of posts needed to fill the viewport
    const initialPosts = Math.ceil(viewportHeight / postHeight) + 2; // Add extra posts for smooth scrolling
    return initialPosts;
  }, [format]);

  useEffect(() => {
    // Calculate and set posts per page when component mounts or format changes
    const initialPosts = calculatePostsPerPage();
    setPostsPerPage(initialPosts);
  }, [calculatePostsPerPage]);

  // Update postsPerPage when window is resized
  useEffect(() => {
    const handleResize = () => {
      const initialPosts = calculatePostsPerPage();
      setPostsPerPage(initialPosts);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculatePostsPerPage]);

  const items = useMemo(
    () => posts.slice(0, postsPerPage * page),
    [posts, postsPerPage, page]
  );

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
      }, 1000); // Simulate loading delay if necessary
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
