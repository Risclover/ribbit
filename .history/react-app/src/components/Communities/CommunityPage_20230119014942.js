import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCommunity } from "../../store/one_community";
// import { getCommunityPosts } from "../../store/communities";
import EditCommunity from "./EditCommunity";
import "./CommunityPage.css";
import { getPosts } from "../../store/posts";
import SinglePost from "../Posts/SinglePost/SinglePost";
import CreatePostBar from "../Posts/PostForms/CreatePostBar";
import moment from "moment";
import Cake from "../../images/piece4.png";
import { Modal } from "../../context/Modal";
import CommunityWelcome from "../Modals/CommunityWelcome";
import User from "../User";

export default function CommunityPage() {
  const { communityId } = useParams();

  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );
  const user = useSelector((state) => state.session.user);

  const posts = useSelector((state) => Object.values(state.posts));
  let commPosts = posts.filter((post) => post.communityId == communityId);

  const dispatch = useDispatch();
  // const [loadedCommunity, setLoadedCommunity] = useState();
  const [isPage, setIsPage] = useState("community");
  const [showWelcomeModal, setShowWelcomeModal] = useState(
    commPosts.length === 0 || commPosts === undefined ? true : false
  );

  commPosts.sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();

    return postB - postA;
  });

  useEffect(() => {
    dispatch(getSingleCommunity(+communityId));
    dispatch(getPosts());
  }, [communityId, dispatch]);

  if (!community[0]) return null;
  return (
    <div className="community-page-container">
      <div className="community-page-header">
        <div className="community-page-header-top"></div>
        <div className="community-page-header-btm">
          <div className="community-header-info">
            <div className="community-header-info-details">
              <div className="community-header-info-img">
                <i className="fa-solid fa-circle-user"></i>
              </div>
              <div className="community-header-info-details-left">
                <div className="community-header-info-display-name">
                  <h1>{community[0].displayName}</h1>
                </div>
                <div className="community-header-info-name">
                  <h2>c/{community[0].name}</h2>
                </div>
              </div>
              <div className="community-header-info-details-right">
                <div className="community-header-info-subscribe">
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="community-page-main">
        <div className="community-page-left-col">
          <CreatePostBar />
          {commPosts.length === 0 && (
            <div className="community-no-posts">
              Welcome to your new community! Why don't you write your first post
              to give visitors something to read?
            </div>
          )}
          {commPosts.map((post) => (
            <NavLink
              activeClassName="single-post-active"
              to={`/posts/${post.id}`}
            >
              <SinglePost id={post.id} isPage={isPage} />
            </NavLink>
          ))}
        </div>
        <div className="community-page-right-col">
          <div className="community-page-community-info">
            <div className="community-page-box-header">
              <h3>About Community</h3>
            </div>
            <div className="community-page-box-content">
              <div className="community-page-box-description">
                <p>{community[0].description}</p>
              </div>
              <div className="community-page-box-date">
                <img src={Cake} className="community-cake-icon" />
                Created{" "}
                {moment(new Date(community[0].createdAt)).format(
                  "MMM DD, YYYY"
                )}
              </div>
              <div className="community-page-box-btn">
                <NavLink to={`/posts/submit`}>
                  <button className="community-page-box-create-post">
                    Create Post
                  </button>
                </NavLink>
                {user?.id === community[0].userId ? (
                  <NavLink to={`/communities/${community[0].id}/edit`}>
                    <button className="community-page-box-edit-community">
                      Edit Community
                    </button>
                  </NavLink>
                ) : (
                  ""
                )}
              </div>
            </div>
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
      {showWelcomeModal && (
        <Modal
          onClose={() => setShowWelcomeModal(false)}
          title="Create your first post"
        >
          <CommunityWelcome
            setShowWelcomeModal={setShowWelcomeModal}
            showWelcomeModal={showWelcomeModal}
            community={community}
          />
        </Modal>
      )}
    </div>
  );
}
