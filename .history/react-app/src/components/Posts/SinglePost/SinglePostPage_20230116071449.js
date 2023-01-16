import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import SinglePost from "./SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../../../store/one_post";
import Comment from "../../Comments/Comment";
import Comments from "../../Comments/Comments";
import { getComments } from "../../../store/comments";
import { getPosts } from "../../../store/posts";

export default function SinglePostPage() {
  const history = useHistory();
  const { postId } = useParams();
  const [isPage, setIsPage] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const comments = useSelector((state) => Object.values(state.comments));

  console.log("COMMENTS:", comments);

  useEffect(() => {
    dispatch(getSinglePost(postId));
    dispatch(getComments(postId));
    dispatch(getPosts());
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
        <Comments postId={+postId} />
      </div>
      <div className="single-post-right-col"></div>
    </div>
  );
}
