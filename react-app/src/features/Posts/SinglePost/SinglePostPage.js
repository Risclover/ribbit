import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Skeleton from "react-loading-skeleton";

import {
  getComments,
  getCommunities,
  getSinglePost,
  getPosts,
  getSubscriptions,
  addToSubscriptions,
  deleteSubscription,
  addViewedPost,
} from "../../../store";

import { BackToTop } from "../../../components";
import { Comments, SinglePost, CommunityRule, CommunityOptions } from "../..";
import Cake from "../../../assets/images/misc/piece4.png";
import "react-loading-skeleton/dist/skeleton.css";
import { PostFormatContext, PageTitleContext } from "../../../context";

export function SinglePostPage({ setPageIcon, setShowLoginForm }) {
  const { setPageTitle } = useContext(PageTitleContext);
  const history = useHistory();
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { format, setFormat } = useContext(PostFormatContext);

  useEffect(() => {
    setFormat("Card");
  }, []);

  const post = useSelector((state) => state.posts[postId]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const subscriptions = useSelector((state) => state.subscriptions);
  const user = useSelector((state) => state.session.user);

  const [subscribed, setSubscribed] = useState(false);
  const [members, setMembers] = useState(community?.members || 0);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getComments(+postId));
    dispatch(getPosts());
    dispatch(getSinglePost(+postId));
    dispatch(addViewedPost(+postId));
  }, [dispatch]);

  useEffect(() => {
    document.title = post?.title + " : " + post?.communityName;

    setPageIcon(
      <img
        src={post?.communitySettings[post?.communityId].communityIcon}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="Community"
      />
    );
    setPageTitle(
      <span className="nav-left-dropdown-item">c/{post?.communityName}</span>
    );
  }, [post, setPageTitle, setPageIcon]);

  useEffect(() => {
    if (subscriptions[post?.communityId]) setSubscribed(true);
  }, [subscribed, subscriptions, post?.communityId]);

  if (!post || !postId) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        <SinglePost id={+postId} isPage="singlepage" />
        <Comments setShowLoginForm={setShowLoginForm} />
      </div>
      <div className="single-post-right-col">
        <NavLink to={`/c/${post?.communityName}`}>
          <div className="single-post-community-box">
            <div className="single-post-box-header"></div>
            <div className="single-post-community-info-content">
              <div className="single-post-community-info-name">
                <img
                  src={post?.communitySettings[post?.communityId].communityIcon}
                  alt="Community"
                  className="single-post-community-info-img"
                />
                c/{post?.communityName}
              </div>
              <div className="single-post-community-description">
                {post?.communityDesc}
              </div>
              <div className="single-post-community-date">
                <img
                  src={Cake}
                  className="single-post-community-cake"
                  alt="Cake"
                />{" "}
                Created {moment(post?.communityDate).format("MMM DD, YYYY")}
              </div>
              <div className="community-page-box-members">
                <h2>{members}</h2>
                <span>{members === 1 ? "Member" : "Members"}</span>
              </div>
              <div className="single-post-right-col-btns">
                {user && subscribed && (
                  <button
                    className={`blue-btn-unfilled btn-long community-btn`}
                    onClick={async (e) => {
                      e.preventDefault();
                      await dispatch(deleteSubscription(post?.communityId));
                      setSubscribed(false);
                    }}
                    onMouseEnter={(e) => (e.target.textContent = "Leave")}
                    onMouseLeave={(e) => (e.target.textContent = "Joined")}
                  >
                    Joined
                  </button>
                )}
                {user && !subscribed && (
                  <button
                    className="blue-btn-filled btn-long community-btn-filled"
                    onClick={async (e) => {
                      e.preventDefault();
                      await dispatch(addToSubscriptions(post?.communityId));
                      !user ? history.push("/login") : setSubscribed(true);
                      dispatch(getSubscriptions());
                    }}
                  >
                    Join
                  </button>
                )}
                {!user && (
                  <button
                    className="blue-btn-filled btn-long community-btn-filled"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/login");
                    }}
                  >
                    Join
                  </button>
                )}
              </div>
              <CommunityOptions community={community} />
            </div>
          </div>
        </NavLink>
        {Object.values(post?.communityRules).length > 0 && (
          <div className="single-post-community-rules">
            <div className="single-post-rules-header">
              c/{post?.communityName} Rules
            </div>
            <div className="single-post-rules">
              <ol>
                {Object.values(post?.communityRules).map(
                  (rule, idx) =>
                    <CommunityRule idx={idx} rule={rule} /> || <Skeleton />
                )}
              </ol>
            </div>
          </div>
        )}
        <BackToTop community={true} />
      </div>
    </div>
  );
}
