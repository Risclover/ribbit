import React, { useEffect, useState, memo, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/posts";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import SortingBar from "../../components/SortingBar/SortingBar";
import SinglePost from "./SinglePost/SinglePost";
import "./Posts.css";
import BackToTop from "../../components/BackToTop";
import DeveloperLinksBox from "./DeveloperLinksBox/DeveloperLinksBox";
import AboutBox from "./AboutBox";
import LoadingEllipsis from "../../components/LoadingEllipsis";
import SortingFunction from "./SortingFunction";
import All from "../../images/navbar/all-icon2.png";
import { addViewedPost } from "../../store/viewed_posts";
import RecentPosts from "./RecentPosts";

function Posts({ format, setFormat, setPageTitle, setPageIcon }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  const [sortMode, setSortMode] = useState("new");
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState(posts.slice(10, 15));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  const viewedPosts = useSelector((state) => Object.values(state.viewedPosts));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems([...items, ...posts.slice(page * 5, page * 5 + 5)]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  setTimeout(() => {
    setIsLoaded(false);
  }, 3000);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    if (format === "Card") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [items, format]);

  const handleViewPost = async (postId) => {
    await dispatch(addViewedPost(postId));
    history.push(`/posts/${postId}`);
  };

  useEffect(() => {
    document.title = "c/all";
    setPageIcon(
      <img src={All} className="nav-left-dropdown-item-icon" alt="All" />
    );
    setPageTitle(<span className="nav-left-dropdown-item">All</span>);
  }, [setPageTitle, setPageIcon]);

  SortingFunction(posts, sortMode);

  if (!posts) return null;
  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      {isLoaded && <LoadingEllipsis loader={isLoaded} />}

      {!isLoaded && (
        <>
          <div
            className={
              format === "Card" ? "posts-left-col" : "posts-left-col-alt"
            }
          >
            {user && <CreatePostBar />}
            <SortingBar
              setFormat={setFormat}
              format={format}
              sortMode={sortMode}
              setSortMode={setSortMode}
            />
            {posts &&
              format === "Card" &&
              posts.slice(0, 10).map((post, idx) => (
                <NavLink key={idx} to={`/posts/${post.id}`}>
                  <SinglePost
                    key={post.id}
                    id={post.id}
                    postComments={Object.values(post.postComments).length}
                    isCommunity={false}
                    format={format}
                    isPage="all"
                    post={post}
                  />
                </NavLink>
              ))}
            {format === "Card" &&
              items.map((post, idx) => (
                <NavLink key={idx} to={`/posts/${post.id}`}>
                  <SinglePost
                    key={post.id}
                    id={post.id}
                    postComments={Object.values(post.postComments).length}
                    isCommunity={false}
                    format={format}
                    isPage="all"
                    post={post}
                    onClick={() => handleViewPost(post.id)}
                  />
                </NavLink>
              ))}
            {format !== "Card" &&
              posts.map((post, idx) => (
                <NavLink key={idx} to={`/posts/${post.id}`}>
                  <SinglePost
                    key={post.id}
                    id={post.id}
                    postComments={Object.values(post.postComments).length}
                    isCommunity={false}
                    format={format}
                    isPage="all"
                    post={post}
                  />
                </NavLink>
              ))}
          </div>
          <div className="posts-right-col">
            <AboutBox
              title="c/All"
              description="The most active posts from all of Ribbit. Come here to see new posts
          rising and be a part of the conversation."
              user={user}
            />
            {viewedPosts && viewedPosts.length > 0 && <RecentPosts />}
            <div className="last-box-wrapper">
              <DeveloperLinksBox />
              <BackToTop />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(Posts);
