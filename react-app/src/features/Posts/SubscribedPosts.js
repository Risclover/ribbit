import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";

import { getPosts } from "../../store/posts";
import { getCommunities } from "../../store/communities";

import CreateCommunity from "../Communities/CommunityForms/CreateCommunity";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import { Modal } from "../../context/Modal";
import SinglePost from "./SinglePost/SinglePost";

import RibbitBanner from "../../images/ribbit-banners/ribbit_banner.png";
import Github from "../../images/developer-links/github.png";
import LinkedIn from "../../images/developer-links/linkedin.png";
import Resume from "../../images/developer-links/resume.png";
import Email from "../../images/developer-links/mail.png";
import SortingBar from "../../components/SortingBar/SortingBar";
import "./Posts.css";
import { getFavoriteCommunities } from "../../store/favorite_communities";

export default function SubscribedPosts({ format, setFormat }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [noPosts, setNoPosts] = useState(false);
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  const [sortMode, setSortMode] = useState("new");
  console.log("sortMode", sortMode);

  const user = useSelector((state) => state.session.user);
  const communities = useSelector((state) => Object.values(state.communities));
  const followedPosts = useSelector((state) => state.followers.followedPosts);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
    dispatch(getFavoriteCommunities());
  }, [dispatch]);

  let postList = communities.map(
    (community) =>
      community.subscribers[user?.id] !== undefined && community.communityPosts
  );

  let concatList = [];

  postList.forEach((item) => {
    Object.values(item).forEach((thing) => concatList.push(thing));
  });

  let newList = [];

  if (followedPosts) {
    let ids = new Set(Object.values(followedPosts).map((d) => d.id));
    newList = [
      ...Object.values(followedPosts),
      ...concatList.filter((d) => !ids.has(d.id)),
    ];
  }

  if (sortMode === "new") {
    newList.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return postB - postA;
    });
  }

  if (sortMode === "top") {
    newList.sort((a, b) => {
      let postA = new Date(a.createdAt).getTime();
      let postB = new Date(b.createdAt).getTime();
      return b.votes - a.votes || postB - postA;
    });
  }

  useEffect(() => {
    let postList = communities.map(
      (community) =>
        community.subscribers[user?.id] !== undefined &&
        community.communityPosts
    );

    postList.forEach((item) => {
      Object.values(item).forEach((thing) => newList.push(thing));
    });

    if (newList.length === 0) {
      setNoPosts(true);
    } else {
      setNoPosts(false);
    }
  }, [noPosts, newList, postList, communities, user?.id]);

  if (!user || !communities) return null;

  return (
    <div
      className={format === "Card" ? "posts-container" : "posts-container-alt"}
    >
      <div
        className={format === "Card" ? "posts-left-col" : "posts-left-col-alt"}
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
              Explore the All feed or the Communities Directory to discover new
              communities.
            </p>
          </div>
        )}
        {newList.map((post, idx) => (
          <NavLink key={post.id} to={`/posts/${post.id}`}>
            <SinglePost
              key={idx}
              id={post.id}
              postComments={Object.values(post.postComments).length}
              isCommunity={false}
              format={format}
            />
          </NavLink>
        ))}
      </div>
      <div className="posts-right-col">
        <div className="posts-home-box">
          <img src={RibbitBanner} alt="Ribbit banner" />
          <div className="posts-home-box-content">
            <h1>Home</h1>
            <p>
              Your personal Ribbit frontpage. Come here to check in with your
              favorite communities.
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
                      setShowCreateCommunityModal={setShowCreateCommunityModal}
                    />
                  </Modal>
                )}
              </div>
            )}
            {}
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
                  href="https://www.linkedin.com/in/sara-dunlop-66375a146/"
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
                  href="mailto:sara091592@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Email} alt="Email" />
                </a>
                <span className="tooltiptext">Email</span>
              </li>
            </ul>
          </div>
          <div className="back-to-top-box">
            <button
              className="blue-btn-filled btn-short"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
