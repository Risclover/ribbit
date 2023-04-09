import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getPosts } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import { getSingleCommunity } from "../../../store/one_community";
import { getComments } from "../../../store/comments";
import { getCommunities } from "../../../store/communities";
import { getSubscriptions } from "../../../store/subscriptions";
import CommunityRule from "../../Communities/CommunityRule";
import {
  addToSubscriptions,
  deleteSubscription,
} from "../../../store/subscriptions";
import Comments from "../../Comments/Comments";
import Cake from "../../../images/misc/piece4.png";
import SinglePost from "./SinglePost";

export default function SinglePostPage({ setShowLoginForm }) {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const [commentsNum, setCommentsNum] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const post = useSelector((state) => state.singlePost[+postId]);
  const posts = useSelector((state) => state.posts);
  const community = useSelector((state) => state.singleCommunity);
  const subscriptions = useSelector((state) => state.subscriptions);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSinglePost(+postId));
    dispatch(getSingleCommunity(post?.communityId));
    dispatch(getSubscriptions());
  }, [dispatch, postId]);

  useEffect(() => {
    if (subscriptions[post?.communityId]) setSubscribed(true);
  }, [subscribed, subscriptions, post?.communityId]);

  if (!post || !postId || !community) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        <SinglePost
          commentsNum={commentsNum}
          post={post}
          setCommentsNum={setCommentsNum}
          id={+postId}
          isPage={"singlepage"}
          format="Card"
          postComments={Object.values(post.postComments).length}
        />
        <Comments
          setCommentsNum={setCommentsNum}
          post={post}
          postId={+postId}
          setShowLoginForm={setShowLoginForm}
        />
      </div>
      <div className="single-post-right-col">
        <NavLink to={`/c/${post?.communityId}`}>
          <div className="single-post-community-box">
            <div className="single-post-box-header"></div>
            <div className="single-post-community-info-content">
              <div className="single-post-community-info-name">
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
              <div className="single-post-right-col-btns">
                {user && subscribed && (
                  <button
                    className="blue-btn-unfilled btn-long"
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
                {!subscribed && (
                  <button
                    className="blue-btn-filled btn-long"
                    onClick={async (e) => {
                      e.preventDefault();
                      await dispatch(addToSubscriptions(post?.communityId));
                      user && setSubscribed(true);
                      !user && setShowLoginForm(true);
                    }}
                  >
                    Join
                  </button>
                )}
              </div>
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
                {Object.values(post?.communityRules).map((rule, idx) => (
                  <CommunityRule idx={idx} rule={rule} />
                ))}
              </ol>
            </div>
          </div>
        )}
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
  );
}
