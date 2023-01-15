import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { getPosts, deletePost } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";

import moment from "moment";

export default function SinglePost({ id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[id]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getSinglePost(id));
  }, [id]);

  if (!post) return null;
  return (
    <>
      {post && (
        <div className="single-post-container">
          {post.title} - {moment(new Date(post.createdAt)).fromNow()} by{" "}
          {post.postAuthor.username}
          <p>{post.content}</p>
          {user && user.id === post.postAuthor.id ? (
            <div className="single-post-user-buttons">
              <button
                className="single-post-delete-btn"
                onClick={() => {
                  dispatch(deletePost(post.id));
                  history.push("/");
                }}
              >
                Delete
              </button>
              <button className="single-post-edit-btn">Edit</button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
