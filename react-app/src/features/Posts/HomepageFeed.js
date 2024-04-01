import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BackToTop, SortingBar, CreatePostBar } from "../../components";
import { PostFormatContext } from "../../context";
import { DeveloperLinksBox, AboutBox, RecentlyViewedPosts, PostFeed } from "..";
import {
  getCommunities,
  getFollowers,
  getPosts,
  getSubscriptions,
} from "../../store";
import { SortingFunction } from "./utils";
import Home from "../../assets/images/navbar/home-icon.png";
import "./Posts.css";
import { usePageSettings } from "../../hooks/usePageSettings";

export function HomepageFeed() {
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

  let followedPosts = follows?.posts;

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
    dispatch(getSubscriptions());
    dispatch(getFollowers());
  }, [dispatch]);

  document.documentElement.style.setProperty(
    "--community-highlight",
    "#0079d3"
  );

  usePageSettings({
    documentTitle: "Ribbit - Splash into anything",
    icon: <img src={Home} className="nav-left-dropdown-item-icon" alt="Home" />,
    pageTitle: "Home",
  });

  const postList = subscriptions.reduce((acc, sub) => {
    if (sub.subscribers[user?.id]?.id === user?.id) {
      acc.push(...Object.values(sub.communityPosts));
    }
    return acc;
  }, []);

  if (followedPosts) postList.push(...Object.values(followedPosts));

  SortingFunction(postList, sortMode);

  if (!user || !communities || !followedPosts || !follows) return null;

  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      <div
        className={format === "Card" ? "posts-left-col" : "posts-left-col-alt"}
      >
        <CreatePostBar />
        {!postList ||
          (postList.length === 0 && (
            <div className="no-posts-div">
              <i className="fa-solid fa-people-group"></i>
              <h1 className="head">No Subscriptions Yet</h1>
              <p>
                Explore the All feed or the Communities Directory to discover
                new communities.
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
            <SortingBar
              sortMode={sortMode}
              setSortMode={setSortMode}
              page="general-feed"
            />
            <PostFeed posts={postList} sortMode={sortMode} />
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
    </div>
  );
}
