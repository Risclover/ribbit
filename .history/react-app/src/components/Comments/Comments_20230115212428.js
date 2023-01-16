import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getComments } from "../../store/comments";
import { getSinglePost } from "../../store/one_post";
export default function Comments() {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const comments = useSelector((state) => Object.values(state.comments));
  const user = useSelector((state) => state.session.user);
  const post = useSelector((state) => state.singlePost);

  console.log("COMMENTS COMMENTS:", comments);
  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, [postId, dispatch]);

  return (
    <div className="comments-container">
      Hero
      {user?.id === post.postAuthor?.id && (
        <button className="edit-comment-btn">Edit</button>
      )}
    </div>
  );
}
