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

export default function SubscribedPosts() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  const [sortMode, setSortMode] = useState("new");

  const user = useSelector((state) => state.session.user);
  const communities = useSelector((state) => Object.values(state.communities));

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
  }, []);

  let postList = communities.map(
    (community) =>
      community.subscribers[user?.id] !== undefined && community.communityPosts
  );

  let newList = [];

  postList.forEach((item) => {
    Object.values(item).forEach((thing) => newList.push(thing));
  });

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

  if (!user || !communities) return null;

  return (
    <div className="posts-container">
      <div className="posts-left-col">
        <CreatePostBar />
        <SortingBar sortMode={sortMode} setSortMode={setSortMode} />

        {newList.map((post) => (
          <NavLink key={post.id} to={`/posts/${post.id}`}>
            <SinglePost
              key={post.id}
              id={post.id}
              postComments={Object.values(post.postComments).length}
              isCommunity={false}
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
                  className="posts-home-post-btn"
                  onClick={() => history.push("/c/undefined/submit")}
                >
                  Create Post
                </button>
                <button
                  className="posts-home-community-btn"
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
                  href="https://www.saradunlop.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={Resume} alt="Portfolio" />
                </a>
              </li>
              <li key={1} className="tooltip">
                <img src={LinkedIn} alt="LinkedIn" />
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
              className="back-to-top"
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
