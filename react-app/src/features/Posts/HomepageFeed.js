import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  BackToTop,
  SortingBar,
  LoadingEllipsis,
  CreatePostBar,
} from "../../components";
import { PostFormatContext, PageTitleContext } from "../../context";
import {
  SinglePost,
  DeveloperLinksBox,
  AboutBox,
  RecentlyViewedPosts,
  PostFeed,
} from "..";
import {
  getCommunities,
  getFollowers,
  getPosts,
  getSubscriptions,
  getViewedPosts,
} from "../../store";
import { SortingFunction } from "./utils";
import Home from "../../assets/images/navbar/home-icon.png";
import "./Posts.css";

export function HomepageFeed({ setPageIcon, setShowLoginForm }) {
  const { setPageTitle } = useContext(PageTitleContext);
  const dispatch = useDispatch();
  const { format } = useContext(PostFormatContext);

  const [loader, setLoader] = useState(true);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [sortMode, setSortMode] = useState("new");

  const user = useSelector((state) => state.session.user);
  const communities = useSelector((state) => Object.values(state.communities));
  const subscriptions = useSelector((state) =>
    Object.values(state.subscriptions)
  );
  const follows = useSelector((state) => state.followers);
  const viewedPosts = useSelector((state) => Object.values(state.viewedPosts));

  let followedPosts = follows.posts;

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
    dispatch(getSubscriptions());
    dispatch(getFollowers());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Ribbit - Splash into anything";
    setPageIcon(
      <img src={Home} className="nav-left-dropdown-item-icon" alt="Home" />
    );
    setPageTitle(<span className="nav-left-dropdown-item">Home</span>);

    return () => {
      setPageTitle("");
    };
  }, [dispatch]);

  const postList = subscriptions.reduce((acc, sub) => {
    if (sub.subscribers[user?.id]?.id === user?.id) {
      acc.push(...Object.values(sub.communityPosts));
    }
    return acc;
  }, []);

  SortingFunction(postList, sortMode);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...postList.slice(page * 5, page * 5 + 5),
      ]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items, loading]);

  setTimeout(() => {
    setLoader(false);
  }, 3000);

  if (!user || !communities) return null;

  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      {loader && <LoadingEllipsis loader={loader} />}

      {!loader && (
        <>
          <div
            className={
              format === "Card" ? "posts-left-col" : "posts-left-col-alt"
            }
          >
            <CreatePostBar />
            {!postList ||
              (postList.length === 0 && (
                <div className="no-posts-div">
                  <i className="fa-solid fa-people-group"></i>
                  <h1 className="head">No Subscriptions Yet</h1>
                  <p>
                    Explore the All feed or the Communities Directory to
                    discover new communities.
                  </p>
                </div>
              ))}
            {/* {postList.slice(0, 10).map((post, idx) => (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
                <SinglePost
                  key={idx}
                  id={post.id}
                  postComments={Object.values(post.postComments).length}
                  isCommunity={false}
                />
              </NavLink>
            ))}
            {items.map((post, idx) => (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
                <SinglePost
                  key={idx + 10}
                  id={post.id}
                  postComments={Object.values(post.postComments).length}
                  isCommunity={false}
                />
              </NavLink>
            ))} */}
            {postList && postList.length > 0 && (
              <>
                <SortingBar sortMode={sortMode} setSortMode={setSortMode} />
                <PostFeed posts={postList} />
              </>
            )}
          </div>
          <div className="posts-right-col">
            <AboutBox
              title="Home"
              description="Your personal Ribbit frontpage. Come here to check in with your favorite communities."
              user={user}
            />
            {viewedPosts && viewedPosts.length > 0 && <RecentlyViewedPosts />}
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
