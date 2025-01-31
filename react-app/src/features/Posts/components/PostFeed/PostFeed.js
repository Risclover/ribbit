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
import { PostFormatContext } from "@/context";

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

  const { format } = useContext(PostFormatContext);

  const calculatePostsPerPage = useCallback(() => {
    const viewportHeight = window.innerHeight;
    let postHeight;

    switch (format) {
      case "Compact":
        postHeight = 44;
        break;
      case "Classic":
        postHeight = 91;
        break;
      default:
        postHeight = 488;
        break;
    }

    const initialPosts = Math.ceil(viewportHeight / postHeight) + 2;
    return initialPosts;
  }, [format]);

  useEffect(() => {
    const initialPosts = calculatePostsPerPage();
    setPostsPerPage(initialPosts);
  }, [calculatePostsPerPage]);

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

  const loadMore = useCallback(() => {
    if (!loading && items.length < posts.length) {
      setLoading(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      }, 1000);
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
      {!posts && <div>Hello</div>}
      {items.map((post) => (
        <div key={post.id}>
          <SinglePost
            link={`/posts/${post.id}`}
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
