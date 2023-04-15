import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { getPosts } from "../../store/posts";
import { getCommunities } from "../../store/communities";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import SinglePost from "./SinglePost/SinglePost";
import SortingBar from "../../components/SortingBar/SortingBar";
import "./Posts.css";
import { getFavoriteCommunities } from "../../store/favorite_communities";
import BackToTop from "../../components/BackToTop";
import DeveloperLinksBox from "./DeveloperLinksBox/DeveloperLinksBox";
import AboutBox from "./AboutBox";
import LoadingEllipsis from "../../components/LoadingEllipsis";
import SortingFunction from "./SortingFunction";
import Home from "../../images/navbar/home-icon.png";

export default function SubscribedPosts({
  format,
  setPageTitle,
  setFormat,
  setShowLoginForm,
}) {
  const dispatch = useDispatch();

  const [noPosts, setNoPosts] = useState(false);
  const [loader, setLoader] = useState(true);
  const [sortMode, setSortMode] = useState("new");
  const user = useSelector((state) => state.session.user);
  const communities = useSelector((state) => Object.values(state.communities));
  const subscriptions = useSelector((state) =>
    Object.values(state.subscriptions)
  );

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
    // dispatch(getFavoriteCommunities());
    document.title = "Ribbit - Splash into anything";
    setPageTitle(
      <div className="nav-left-dropdown-face-title">
        <img src={Home} className="nav-left-dropdown-item-icon" />
        <span className="nav-left-dropdown-item">Home</span>
      </div>
    );
  }, [dispatch]);

  setTimeout(() => {
    setLoader(false);
  }, 1000);

  let postList = [];

  for (let post of subscriptions) {
    if (post?.subscribers[user?.id]?.id === user?.id) {
      Object.values(post?.communityPosts).forEach((communityPost) => {
        postList.push(communityPost);
      });
    }
  }

  SortingFunction(postList, sortMode);

  useEffect(() => {
    if (postList.length === 0) {
      setNoPosts(true);
    } else {
      setNoPosts(false);
    }
  }, [noPosts, postList, subscriptions, user?.id]);

  if (!user || !communities) return null;

  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      <>
        <div
          className={
            format === "Card" ? "posts-left-col" : "posts-left-col-alt"
          }
        >
          <CreatePostBar />
          {!noPosts && (
            <SortingBar
              sortMode={sortMode}
              setSortMode={setSortMode}
              setFormat={setFormat}
              format={format}
            />
          )}
          {noPosts && (
            <div className="no-posts-div">
              <i className="fa-solid fa-people-group"></i>
              <h1 className="head">No Subscriptions Yet</h1>
              <p>
                Explore the All feed or the Communities Directory to discover
                new communities.
              </p>
            </div>
          )}
          {postList.map((post, idx) => (
            <NavLink key={post.id} to={`/posts/${post.id}`}>
              <SinglePost
                key={idx}
                setShowLoginForm={setShowLoginForm}
                id={post.id}
                postComments={Object.values(post.postComments).length}
                isCommunity={false}
                format={format}
              />
            </NavLink>
          ))}
        </div>
        <div className="posts-right-col">
          <AboutBox
            title="Home"
            description="Your personal Ribbit frontpage. Come here to check in with your favorite communities."
            user={user}
          />
          <div className="last-box-wrapper">
            <DeveloperLinksBox />
            <BackToTop />
          </div>
        </div>
      </>
    </div>
  );
}
