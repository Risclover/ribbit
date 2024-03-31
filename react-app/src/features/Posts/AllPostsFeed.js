import React, { useEffect, useState, memo, lazy, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts, addViewedPost } from "../../store";
import {
  SortingBar,
  CreatePostBar,
  BackToTop,
  LoadingEllipsis,
} from "../../components";
import {
  SinglePost,
  DeveloperLinksBox,
  AboutBox,
  RecentlyViewedPosts,
  PostFeed,
} from "..";
import { SortingFunction } from "./utils";
import All from "../../assets/images/navbar/all-icon2.png";
import "./Posts.css";
import { PostFormatContext } from "../../context/PostFormat";
import { PageTitleContext } from "../../context";

export function AllPostsFeed() {
  const { setPageTitle, setPageIcon } = useContext(PageTitleContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);
  const { format, setFormat } = useContext(PostFormatContext);
  const [sortMode, setSortMode] = useState("new");

  const viewedPosts = useSelector((state) => Object.values(state.viewedPosts));

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  document.documentElement.style.setProperty(
    "--community-highlight",
    "#0079d3"
  );

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
      <>
        <div
          className={
            format === "Card" ? "posts-left-col" : "posts-left-col-alt"
          }
        >
          {user && <CreatePostBar />}
          <SortingBar sortMode={sortMode} setSortMode={setSortMode} />
          <PostFeed posts={posts} sortMode={sortMode} />
        </div>
        <div className="posts-right-col">
          <AboutBox
            title="c/All"
            description="The most active posts from all of Ribbit. Come here to see new posts
          rising and be a part of the conversation."
            user={user}
          />
          {viewedPosts && viewedPosts.length > 0 && <RecentlyViewedPosts />}
          <div className="last-box-wrapper">
            <DeveloperLinksBox />
            <BackToTop />
          </div>
        </div>
      </>
    </div>
  );
}
