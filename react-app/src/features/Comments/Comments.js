import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments } from "../../store";
import { CommentSorting, CommentForm, Comment } from "../../features";
import "./Comments.css";

export function Comments({ post }) {
  const url = window.location.href;
  const dispatch = useDispatch();
  const { postId } = useParams();

  const comments = Object.values(post.postComments);
  const [sortType, setSortType] = useState("Best");
  const [showLoader, setShowLoader] = useState(true);
  const [comment, setComment] = useState(url.slice(-15).includes("comment"));

  const commentIdPattern = /#comment-(\d+)/;
  const match = url.match(commentIdPattern);
  const commentUrl = match ? match[1] : null;

  useEffect(() => {
    dispatch(getComments(+postId));
  }, [dispatch, postId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (sortType === "New") {
    comments.sort((a, b) => {
      let commentA = new Date(a.createdAt);
      let commentB = new Date(b.createdAt);

      return commentB - commentA;
    });
  }

  if (sortType === "Old") {
    comments.sort((a, b) => {
      let commentA = new Date(a.createdAt);
      let commentB = new Date(b.createdAt);

      return commentA - commentB;
    });
  }

  if (sortType === "Best") {
    comments.sort((a, b) => {
      return b.upvotes - a.upvotes;
    });
  }

  if (sortType === "Top") {
    comments.sort((a, b) => {
      return b.votes - a.votes;
    });
  }

  return (
    <div className="comments-container">
      <CommentForm postId={postId} />
      <CommentSorting sortType={sortType} setSortType={setSortType} />
      {showLoader && (
        <div className="comments-loading">
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {!showLoader && (
        <div className="all-comments">
          {comments.length > 0 &&
            !comment &&
            comments.map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                commentId={comment.id}
                postId={+postId}
              />
            ))}

          {commentUrl && (
            <div className="specific-comment">
              <button
                className="view-all-comments-btn"
                onClick={() => setComment(false)}
              >
                View all comments
              </button>
              <Comment
                key={+commentUrl}
                commentId={+commentUrl}
                postId={+postId}
              />
            </div>
          )}

          {comments.length === 0 && (
            <div className="no-comments-msg">
              <i className="fa-solid fa-comments"></i>
              <h1 className="no-comments-yet">No Comments Yet</h1>
              <p>Be the first to share what you think!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
