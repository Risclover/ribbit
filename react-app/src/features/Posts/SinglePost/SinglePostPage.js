import React, { useEffect, useState } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { getSinglePost } from "../../../store/one_post";
import { getSubscriptions } from "../../../store/subscriptions";
import CommunityRule from "../../Communities/CommunityRule";
import {
  addToSubscriptions,
  deleteSubscription,
} from "../../../store/subscriptions";
import Comments from "../../Comments/Comments";
import Cake from "../../../images/misc/piece4.png";
import SinglePost from "./SinglePost";
import BackToTop from "../../../components/BackToTop";
import { addViewedPost, getViewedPosts } from "../../../store/viewed_posts";
import { getPosts } from "../../../store/posts";
import { getCommunities, getSingleCommunity } from "../../../store/communities";
import { getUsers } from "../../../store/users";

export default function SinglePostPage({
  setPageIcon,
  setPageTitle,
  setShowLoginForm,
  setRecentPostList,
  recentPostList,
}) {
  const history = useHistory();
  const { postId } = useParams();
  const dispatch = useDispatch();

  const [commentsNum, setCommentsNum] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const post = useSelector((state) => state.singlePost[+postId]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );
  const subscriptions = useSelector((state) => state.subscriptions);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
    dispatch(getSinglePost(+postId));
    dispatch(addViewedPost(+postId));
    dispatch(getSingleCommunity(post?.communityId));
    setRecentPostList([
      ...recentPostList,
      {
        postId: +postId,
        post: {
          id: post?.id,
          title: post?.title,
          imgUrl: post?.imgUrl,
          linkUrl: post?.linkUrl,
          content: post?.content,
          comments: post?.postComments,
          points: post?.votes,
          date: post?.createdAt,
        },
        date: new Date(),
      },
    ]);
  }, [dispatch, +postId]);

  useEffect(() => {
    document.title = post?.title + " : " + post?.communityName;

    setPageIcon(
      <img
        src={post?.communityImg}
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

  const varColor = getComputedStyle(document.documentElement).getPropertyValue(
    "--community-base-color"
  );

  if (community) {
    document.documentElement.style.setProperty(
      "--community-base-color",
      community.baseColor
    );

    document.documentElement.style.setProperty(
      "--community-highlight",
      community.highlight
    );

    document.documentElement.style.setProperty(
      "--community-body-background",
      community.bodyBg
    );
  }

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
                <img
                  src={post?.communityImg}
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
