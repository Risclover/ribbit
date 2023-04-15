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
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import All from "../../images/navbar/all-icon2.png";

export default function Posts({
  format,
  setFormat,
  setShowLoginForm,
  setPageTitle,
}) {
  const dispatch = useDispatch();

  const [sortMode, setSortMode] = useState("new");
  const [loader, setLoader] = useState(true);

  // setTimeout(() => {
  //   setLoader(false);
  // }, 3000);

  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);

  const [postsList, setPostsList] = useState(Array.from(posts.slice(0, 5)));
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

  console.log("postsList:", postsList);

  function fetchMoreListItems() {
    setTimeout(() => {
      setPostsList((prevState) => [
        ...prevState,
        ...Array.from(posts.slice(prevState, prevState + 5)),
      ]);
      setIsFetching(false);
    }, 2000);
  }

  useEffect(() => {
    dispatch(getPosts());
    // dispatch(getFavoriteCommunities());
    dispatch(getCommunities());
    // dispatch(getUsers());
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
      {/* <LoadingEllipsis loader={loader} /> */}

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
            postsList.map((post) => (
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
          {isFetching && "Fetching more list items..."}
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
