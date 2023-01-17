import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../Comments/Comments";
import { getComments } from "../../../store/comments";
import { getPosts } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import { getSingleCommunity } from "../../../store/one_community";
export default function SinglePostPage({ setShowLoginForm }) {
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlePost);
  const comments = useSelector((state) => Object.values(state.comments));

  useEffect(() => {
    dispatch(getComments(postId));
    dispatch(getPosts());
    dispatch(getSingleCommunity(post?.communityId));
    dispatch(getSinglePost(postId));
  }, [dispatch, postId]);

  // comments.sort((a, b) => {
  //   let commentA = new Date(a.createdAt).getTime();
  //   let commentB = new Date(b.createdAt).getTime();
  //   return commentB - commentA;
  // });

  if (!comments) return null;
  return (
    <div className="single-post-page">
      <div className="single-post-left-col">
        {/* <NavLink to={`/posts/${+postId}`}> */}
        <SinglePost id={+postId} isPage={isPage} />
        {/* </NavLink> */}
        <Comments postId={+postId} setShowLoginForm={setShowLoginForm} />
      </div>
      <div className="single-post-right-col"></div>
    </div>
  );
}
