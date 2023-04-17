import React, { useEffect, useState } from "react";
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

export default function Posts({
  format,
  setFormat,
  setShowLoginForm,
  setPageTitle,
}) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  const [sortMode, setSortMode] = useState("new");
  const [loader, setLoader] = useState(true);
  const [items, setItems] = useState(posts.slice(10, 15));
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  window.onload = function () {
    setLoader(false);
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems([...items, ...posts.slice(page * 5, page * 5 + 5)]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

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

  // setTimeout(() => {
  //   setLoader(false);
  // }, 5000);

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
      {loader && <LoadingEllipsis loader={loader} />}

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
            posts.slice(0, 10).map((post) => (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
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
            items.map((post) => (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
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
          {format !== "Card" &&
            posts.map((post) => (
              <NavLink key={post.id} to={`/posts/${post.id}`}>
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
          <div className="last-box-wrapper">
            <DeveloperLinksBox />
            <BackToTop />
          </div>
        </div>
      </>
    </div>
  );
}
