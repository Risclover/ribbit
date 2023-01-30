import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../Comments/Comments";
import { getPosts } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import { getSingleCommunity } from "../../../store/one_community";
import moment from "moment";
import Cake from "../../../images/piece4.png";
import { getAllComments, getComments } from "../../../store/comments";
import { getCommunities } from "../../../store/communities";

export default function SinglePostPage({ setShowLoginForm }) {
  const { postId } = useParams();
  const [isPage, setIsPage] = useState("");
  const dispatch = useDispatch();
  const [commentsNum, setCommentsNum] = useState();
  const post = useSelector((state) => state.posts[postId]);
  const comments = useSelector((state) => Object.values(state.comments));
  const posts = useSelector((state) => state.posts);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  useEffect(() => {
    // dispatch(getComments(postId));
    dispatch(getPosts());
    dispatch(getSinglePost(postId));
    dispatch(getSingleCommunity(posts[postId]?.communityId));
    dispatch(getCommunities());
    dispatch(getComments(+postId));
  }, [dispatch, postId]);

  // comments.sort((a, b) => {
  //   let commentA = new Date(a.createdAt).getTime();
  //   let commentB = new Date(b.createdAt).getTime();
  //   return commentB - commentA;
  // });

  if (!comments || !post || !postId) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        {/* <NavLink to={`/posts/${+postId}`}> */}
        <SinglePost
          commentsNum={commentsNum}
          setCommentsNum={setCommentsNum}
          id={+postId}
          isPage={"singlepage"}
          postComments={Object.values(post.postComments).length}
        />
        {/* </NavLink> */}
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
