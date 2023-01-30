import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { getPosts } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import { getSingleCommunity } from "../../../store/one_community";
import { getComments } from "../../../store/comments";
import { getCommunities } from "../../../store/communities";

import Comments from "../../Comments/Comments";
import Cake from "../../../images/misc/piece4.png";
import SinglePost from "./SinglePost";

export default function SinglePostPage({ setShowLoginForm }) {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const [commentsNum, setCommentsNum] = useState();

  const post = useSelector((state) => state.posts[postId]);
  const comments = useSelector((state) => Object.values(state.comments));
  const posts = useSelector((state) => state.posts);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getSinglePost(postId));
    dispatch(getSingleCommunity(posts[postId]?.communityId));
    dispatch(getCommunities());
    dispatch(getComments(+postId));
  }, [dispatch, postId]);

  if (!comments || !post || !postId) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        <SinglePost
          commentsNum={commentsNum}
          setCommentsNum={setCommentsNum}
          id={+postId}
          isPage={"singlepage"}
          postComments={Object.values(post.postComments).length}
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
                <img src={Cake} className="single-post-community-cake" />{" "}
                Created {moment(community?.createdAt).format("MMM DD, YYYY")}
              </div>
              <div className="single-post-right-col-btns">
                <button className="single-post-right-col-btn">Join</button>
              </div>
            </div>
            <div className="single-post-community-rules"></div>
          </div>
        </NavLink>
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
  );
}
