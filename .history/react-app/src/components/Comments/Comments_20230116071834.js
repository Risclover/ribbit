import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createComment } from "../../store/comments";
// import "./CommentForm.css";
import Comment from "./Comment";
import { getComments } from "../../store/comments";
import { getSinglePost } from "../../store/one_post";
import CommentForm from "./CommentForm";

export default function Comments({ postId }) {
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();

  const comments = useSelector((state) => Object.values(state.comments));

  console.log("COMMENTS:", comments);

  useEffect(() => {
    dispatch(getSinglePost(postId));
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  if (!postId) return null;
  return (
    <div className="comments-container">
      <CommentForm />
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment
            commentId={comment.id}
            postId={+postId}
            comment={comments[comment.id]}
          />
        ))}
    </div>
  );
}
