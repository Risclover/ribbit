import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getPosts } from "../../store/posts";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import SortingBar from "../../components/SortingBar/SortingBar";
import SinglePost from "./SinglePost/SinglePost";
import { Modal } from "../../context/Modal";
import CreateCommunity from "../Communities/CommunityForms/CreateCommunity";
import RibbitBanner from "../../images/ribbit-banners/ribbit_banner.png";
import Github from "../../images/developer-links/github.png";
import LinkedIn from "../../images/developer-links/linkedin.png";
import Resume from "../../images/developer-links/resume.png";
import Email from "../../images/developer-links/mail.png";
import "./Posts.css";
import { getCommunities } from "../../store/communities";

export default function PopularFeed({ setShowLoginForm }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const posts = useSelector((state) => Object.values(state.posts));
  const [noPosts, setNoPosts] = useState(false);
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  const [sortMode, setSortMode] = useState("new");
  const user = useSelector((state) => state.session.user);
  const communities = useSelector((state) => Object.values(state.communities));
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
  }, [dispatch]);

  posts.sort((a, b) => {
    return b.votes - a.votes;
  });

  return (
    <div className="posts-container">
      <div className="posts-left-col">
        <CreatePostBar />
        {!noPosts && (
          <SortingBar sortMode={sortMode} setSortMode={setSortMode} />
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
        {posts.map((post, idx) => (
          <NavLink key={post.id} to={`/posts/${post.id}`}>
            <SinglePost
              setShowLoginForm={setShowLoginForm}
              key={idx}
              id={post.id}
              postComments={Object.values(post.postComments).length}
              isCommunity={false}
              post={post}
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
