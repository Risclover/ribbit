import React, { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/posts";
import { getCommunities } from "../../store/communities";
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
import { getSubscriptions } from "../../store/subscriptions";
import { SlBasketLoaded } from "react-icons/sl";
import { addViewedPost, getViewedPosts } from "../../store/viewed_posts";
import RecentPosts from "./RecentPosts";

function Posts({ format, setFormat, setShowLoginForm, setPageTitle }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  const [sortMode, setSortMode] = useState("new");
  const [isLoaded, setIsLoaded] = useState(true);
  const [items, setItems] = useState(posts.slice(10, 15));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const isReduxLoaded = useSelector((state) => state.isLoaded);

  const viewedPosts = useSelector((state) => Object.values(state.viewedPosts));

  useEffect(() => {
    dispatch(getViewedPosts());
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

  useEffect(() => {
    if (format === "Card") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [items]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading
    ) {
      loadMore();
    }
  };

  const handleViewPost = async (postId) => {
    await dispatch(addViewedPost(postId));
    history.push(`/posts/${postId}`);
  };

  useEffect(() => {
    dispatch(getPosts());

    document.title = "c/all";
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img src={All} className="nav-left-dropdown-item-icon" />
        <span className="nav-left-dropdown-item">All</span>
      </div>
    );
  }, [dispatch]);

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
                    setShowLoginForm={setShowLoginForm}
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
                    setShowLoginForm={setShowLoginForm}
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
                    setShowLoginForm={setShowLoginForm}
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
