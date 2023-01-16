import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import "./CommentForm.css";
import Comment from "./Comment";
import { getComments } from "../../store/comments";
import { getSinglePost } from "../../store/one_post";
import CommentForm from "./CommentForm";
import "./Comments.css";

export default function Comments({ postId }) {
  const dispatch = useDispatch();

  const comments = useSelector((state) => Object.values(state.comments));

  useEffect(() => {
    dispatch(getSinglePost(postId));
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  return (
    <div className="comments-container">
      <CommentForm postId={postId} />
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment key={comment.id} commentId={comment.id} postId={+postId} />
        ))}
      {comments.length === 0 && (
        <div className="no-comments-msg">
          <i class="fa-solid fa-comments"></i>
          <h1 className="no-comments-yet">No Comments Yet</h1>
          <p>Be the first to share what you think!</p>
        </div>
      )}
    </div>
  );
}
