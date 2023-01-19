import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../Comments/Comments";
import { getPosts } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import { getSingleCommunity } from "../../../store/one_community";
import moment from "moment";
import Cake from "../../../images/piece4.png";

export default function SinglePostPage({ setShowLoginForm }) {
  const { postId } = useParams();
  const [isPage, setIsPage] = useState("");
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[postId]);
  const comments = useSelector((state) => Object.values(state.comments));
  const posts = useSelector((state) => state.posts);
  const community = useSelector((state) => state.singleCommunity);

  useEffect(() => {
    // dispatch(getComments(postId));
    dispatch(getPosts());
    dispatch(getSinglePost(postId));
    dispatch(getSingleCommunity(posts[postId]?.communityId));
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
        <SinglePost id={+postId} isPage={"singlepage"} />
        {/* </NavLink> */}
        <Comments postId={+postId} setShowLoginForm={setShowLoginForm} />
      </div>
      <div className="single-post-right-col">
        <div className="single-post-community-box">
          <div className="single-post-box-header"></div>
          <div className="single-post-community-info-content">
            <div className="single-post-community-info-name">
              c/{post.postCommunity?.name}
            </div>
            <div className="single-post-community-description">
              {post.postCommunity?.description}
            </div>
            <div className="single-post-community-date">
              <img src={Cake} className="single-post-community-cake" />{" "}
              {moment(post.postCommunity?.createdAt).format("MMM DD, YYYY")}
            </div>
            <div className="single-post-right-col-btns">
              <button className="single-post-right-col-btn">Join</button>
              <button className="single-post-right-col-btn">Create Post</button>
            </div>
          </div>
          <div className="single-post-community-rules"></div>
        </div>
      </div>
    </div>
  );
}
