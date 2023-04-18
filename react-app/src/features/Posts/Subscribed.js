import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

import { getPosts } from "../../store/posts";
import { getCommunities } from "../../store/communities";
import { getUsers } from "../../store/users";
import { getSinglePost } from "../../store/one_post";
import { getFavoriteCommunities } from "../../store/favorite_communities";

import CreateCommunity from "../../components/Modals/CreateCommunityModal";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import SortingBar from "../../components/SortingBar/SortingBar";
import SinglePost from "./SinglePost/SinglePost";
import { Modal } from "../../context/Modal";

import RibbitBanner from "../../images/ribbit-banners/ribbit_banner.png";
import Github from "../../images/developer-links/github.png";
import LinkedIn from "../../images/developer-links/linkedin.png";
import Resume from "../../images/developer-links/resume.png";
import Email from "../../images/developer-links/mail.png";

import "./Posts.css";
import SearchResultsPosts from "../../pages/SearchResults/SearchResultsPosts";
import { getSubscribers } from "../../store/subscriptions";
import BackToTop from "../../components/BackToTop";

export default function Subscribed({
  postType,
  setPostType,
  format,
  setFormat,
  setShowLoginForm,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  const [sortMode, setSortMode] = useState("new");
  const [loader, setLoader] = useState(true);
  const [list, setList] = useState([]);

  setTimeout(() => {
    setLoader(false);
  }, 3000);

  const subscriptions = useSelector((state) => state.subscriptions);
  let posts = useSelector((state) => Object.values(state.posts));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    dispatch(getUsers());
  }, [dispatch]);

  let postList = [];

  useEffect(() => {
    for (let subscription of Object.values(subscriptions)) {
      for (let post of Object.values(subscription.communityPosts)) {
        postList.push(post);
      }
    }
  }, [subscriptions]);

  if (sortMode === "new") {
    list.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return postB - postA;
    });
  }

  if (sortMode === "top") {
    list.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return b.votes - a.votes || postB - postA;
    });
  }

  if (!posts) return null;
  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      {" "}
      {loader && (
        <div class="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {!loader && (
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
              postList.map((post) => (
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
            <div className="posts-home-box">
              <img src={RibbitBanner} alt="Ribbit banner" />
              <div className="posts-home-box-content">
                <h1>c/all</h1>
                <p>
                  The most active posts from all of Ribbit. Come here to see new
                  posts rising and be a part of the conversation.
                </p>
                {user && (
                  <div className="posts-home-box-buttons">
                    <button
                      className="blue-btn-filled btn-long"
                      onClick={() => history.push("/c/submit")}
                    >
                      Create Post
                    </button>
                    <button
                      className="blue-btn-unfilled btn-long"
                      onClick={() => setShowCreateCommunityModal(true)}
                    >
                      Create Community
                    </button>
                    {showCreateCommunityModal && (
                      <Modal
                        onClose={() => setShowCreateCommunityModal(false)}
                        title="Create a community"
                      >
                        <CreateCommunity
                          showCreateCommunityModal={showCreateCommunityModal}
                          setShowCreateCommunityModal={
                            setShowCreateCommunityModal
                          }
                        />
                      </Modal>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="last-box-wrapper">
              <div className="posts-author-box">
                <h1>Developer Links</h1>
                <ul>
                  <li key={0} className="tooltip">
                    <span className="tooltiptext">Developer Portfolio</span>
                    <a
                      href="https://risclover.github.io"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={Resume} alt="Portfolio" />
                    </a>
                  </li>
                  <li key={1} className="tooltip">
                    <a
                      href="https://www.linkedin.com/in/sara-dunlop"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={LinkedIn} alt="LinkedIn" />
                    </a>
                    <span className="tooltiptext">LinkedIn</span>
                  </li>
                  <li key={2} className="tooltip">
                    <a
                      href="https://www.github.com/Risclover"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={Github} alt="GitHub" />
                    </a>
                    <span className="tooltiptext">GitHub</span>
                  </li>
                  <li key={3} className="tooltip">
                    <a
                      href="mailto:sara.dunlop.dev@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={Email} alt="Email" />
                    </a>
                    <span className="tooltiptext">Email</span>
                  </li>
                </ul>
              </div>
              <BackToTop />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
