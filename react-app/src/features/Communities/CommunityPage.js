import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getSingleCommunity } from "../../store/one_community";
import { getPosts } from "../../store/posts";
import {
  addToSubscriptions,
  deleteSubscription,
  getSubscriptions,
} from "../../store/subscriptions";

import LoginForm from "../auth/AuthModal/LoginForm";
import SignUpForm from "../auth/AuthModal/SignUpForm";
import CreatePostBar from "../../components/CreatePostBar/CreatePostBar";
import SinglePost from "../Posts/SinglePost/SinglePost";
import Cake from "../../images/misc/piece4.png";
import Camera from "../../images/user-profile-icons/camera.png";

import CommunityWelcome from "./CommunityWelcome";
import { Modal } from "../../context/Modal";

import "./CommunityPage.css";

export default function CommunityPage() {
  const { communityId } = useParams();

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showCommunityImgModal, setShowCommunityImgModal] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [members, setMembers] = useState(0);

  const subscriptions = useSelector((state) => state.subscriptions);
  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );
  const user = useSelector((state) => state.session.user);
  const posts = useSelector((state) => Object.values(state.posts));

  let commPosts = posts.filter((post) => post.communityId == communityId);

  const dispatch = useDispatch();
  const [isPage, setIsPage] = useState("community");
  const [community_id, setcommunity_id] = useState(+communityId);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  commPosts.sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();

    return postB - postA;
  });

  useEffect(() => {
    setTimeout(() => {
      if (posts.length === 0 || posts === undefined || !posts) {
        setShowWelcomeModal(true);
      } else if (commPosts.length !== 0) {
        setShowWelcomeModal(false);
      }
    }, 100);
  }, [commPosts]);

  useEffect(() => {
    dispatch(getSingleCommunity(+communityId));
    dispatch(getPosts());
    dispatch(getSubscriptions());
  }, [communityId, dispatch]);

  useEffect(() => {
    if (subscriptions[community_id]) setSubscribed(true);

    setMembers(community[0]?.members);
    dispatch(getSingleCommunity(+communityId));
  }, [subscribed, community[0]?.members, subscriptions]);

  if (!community[0] || !commPosts || !posts) return null;
  return (
    <div className="community-page-container">
      <div className="community-page-header">
        <div className="community-page-header-top"></div>
        <div className="community-page-header-btm">
          <div className="community-header-info">
            <div className="community-header-info-details">
              <div className="community-img-box">
                {user?.id === community[0].userId ? (
                  <div
                    className="community-img-upload-btn"
                    onClick={() => setShowCommunityImgModal(true)}
                  >
                    <img src={Camera} />
                  </div>
                ) : (
                  ""
                )}
                <div className="community-header-info-img">
                  <img src={community[0].communityImg} />
                </div>
              </div>

              <div className="community-header-info-details-left">
                <div className="community-header-info-display-name">
                  <h1>
                    {community[0].displayName.length === 0
                      ? community[0].name
                      : community[0].displayName}
                  </h1>
                </div>
                <div className="community-header-info-name">
                  <h2>c/{community[0].name}</h2>
                </div>
              </div>
              <div className="community-header-info-details-right">
                <div className="community-header-info-subscribe">
                  {user && subscribed && (
                    <button
                      className="unsubscribe-btn"
                      onClick={async (e) => {
                        e.preventDefault();
                        await dispatch(deleteSubscription(community_id));
                        setSubscribed(false);
                      }}
                    >
                      Joined
                    </button>
                  )}
                  {!subscribed && (
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        await dispatch(addToSubscriptions(community_id));
                        user && setSubscribed(true);
                        !user && setShowLoginForm(true);
                      }}
                    >
                      Join
                    </button>
                  )}
                </div>
                <div className="community-header-info-unsubscribe"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="community-page-main">
        <div className="community-page-left-col">
          {user && <CreatePostBar loadedCommunity={community[0]} />}
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
              <div className="community-page-box-members">
                <h2>{members}</h2>
                <span>{members === 1 ? "Member" : "Members"}</span>
              </div>
              <div className="community-page-box-btn">
                {user && (
                  <NavLink to={`/c/${community[0].id}/submit`}>
                    <button className="community-page-box-create-post">
                      Create Post
                    </button>
                  </NavLink>
                )}
                {!user && (
                  <button
                    className="community-page-box-create-post"
                    onClick={() => setShowLoginForm(true)}
                  >
                    Log In / Sign Up
                  </button>
                )}
                {showLoginForm && (
                  <Modal title="Log In" onClose={() => setShowLoginForm(false)}>
                    <LoginForm
                      setShowLoginForm={setShowLoginForm}
                      showLoginForm={showLoginForm}
                      showSignupForm={showSignupForm}
                      setShowSignupForm={setShowSignupForm}
                    />
                  </Modal>
                )}
                {showSignupForm && (
                  <Modal
                    title="Sign Up"
                    onClose={() => setShowSignupForm(false)}
                  >
                    <SignUpForm
                      setShowLoginForm={setShowLoginForm}
                      showLoginForm={showLoginForm}
                      showSignupForm={showSignupForm}
                      setShowSignupForm={setShowSignupForm}
                    />
                  </Modal>
                )}

                {user?.id === community[0].userId ? (
                  <NavLink to={`/c/${community[0].id}/edit`}>
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
