import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/posts";
import SinglePost from "./SinglePost/SinglePost";
import "./Posts.css";
import RibbitBanner from "../../images/ribbit_banner.png";
import CreatePostBar from "./ImagePost/PostForms/CreatePostBar";
import Github from "../../images/github.png";
import LinkedIn from "../../images/linkedin.png";
import Resume from "../../images/resume.png";
import Email from "../../images/mail.png";
import { getCommunities } from "../../store/communities";
import { Modal } from "../../context/Modal";
import CreateCommunity from "../Modals/CreateCommunity";
import ImagePostForm from "./ImagePost/ImagePostForm";

export default function Posts() {
  const dispatch = useDispatch();
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  const posts = useSelector((state) => Object.values(state.posts));
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
  }, [dispatch]);

  // Sorting newer posts first
  posts.sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();
    return postB - postA;
  });

  if (!posts) return null;
  return (
    <div className="posts-container">
      <div className="posts-left-col">
        {user && <CreatePostBar />}
        <ImagePostForm />
        {posts &&
          posts.map((post) => (
            <NavLink key={post.id} to={`/posts/${post.id}`}>
              <SinglePost
                key={post.id}
                id={post.id}
                postComments={Object.values(post.postComments).length}
                isCommunity={false}
                isPage="all"
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
                  className="posts-home-post-btn"
                  onClick={() => history.push("/posts/submit")}
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
