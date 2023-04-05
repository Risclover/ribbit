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
  const post = useSelector((state) => state.posts[postId]);
  const comments = useSelector((state) => Object.values(state.comments));
  const posts = useSelector((state) => state.posts);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );
  const subscriptions = useSelector((state) => state.subscriptions);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getSinglePost(postId));
    dispatch(getSingleCommunity(posts[postId]?.communityId));
    dispatch(getCommunities());
    dispatch(getComments(+postId));
    dispatch(getSubscriptions());
  }, [dispatch, postId]);

  useEffect(() => {
    if (subscriptions[community?.id]) setSubscribed(true);
  }, [subscribed, subscriptions, community?.id]);

  if (!comments || !post || !postId || !community) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        <SinglePost
          commentsNum={commentsNum}
          setCommentsNum={setCommentsNum}
          id={+postId}
          isPage={"singlepage"}
          postComments={Object.values(post.postComments).length}
          format="Card"
        />
        <Comments
          setCommentsNum={setCommentsNum}
          postId={+postId}
          setShowLoginForm={setShowLoginForm}
        />
      </div>
      <div className="single-post-right-col">
        <NavLink to={`/c/${community?.id}`}>
          <div className="single-post-community-box">
            <div className="single-post-box-header"></div>
            <div className="single-post-community-info-content">
              <div className="single-post-community-info-name">
                c/{community?.name}
              </div>
              <div className="single-post-community-description">
                {community?.description}
              </div>
              <div className="single-post-community-date">
                <img
                  src={Cake}
                  className="single-post-community-cake"
                  alt="Cake"
                />{" "}
                Created {moment(community?.createdAt).format("MMM DD, YYYY")}
              </div>
              <div className="single-post-right-col-btns">
                {user && subscribed && (
                  <button
                    className="blue-btn-unfilled btn-long"
                    onClick={async (e) => {
                      e.preventDefault();
                      await dispatch(deleteSubscription(community?.id));
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
                      await dispatch(addToSubscriptions(community?.id));
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
        {Object.values(community?.communityRules).length > 0 && (
          <div className="single-post-community-rules">
            <div className="single-post-rules-header">
              c/{community?.name} Rules
            </div>
            <div className="single-post-rules">
              <ol>
                {Object.values(community?.communityRules).map((rule, idx) => (
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
