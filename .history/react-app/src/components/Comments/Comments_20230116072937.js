import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import "./CommentForm.css";
import Comment from "./Comment";
import { getComments } from "../../store/comments";
import { getSinglePost } from "../../store/one_post";
import CommentForm from "./CommentForm";

export default function Comments({ postId }) {
  const dispatch = useDispatch();

  const comments = useSelector((state) => Object.values(state.comments));

  console.log("COMMENTS:", comments);

  useEffect(() => {
    dispatch(getSinglePost(postId));
    dispatch(getComments(postId));
  }, [dispatch, postId]);

  //   if (!postId) return null;
  return (
    <div className="comments-container">
      <CommentForm postId={postId} />
      {comments.length > 0 &&
        comments.map((comment) => (
          <Comment commentId={comment.id} postId={+postId} />
        ))}
    </div>
  );
}
