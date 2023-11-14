import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentSorting from "./CommentSorting";
import CommentForm from "./CommentForms/CommentForm";
import Comment from "./Comment";
import "./Comments.css";
import { getComments } from "../../store/comments";
import { useParams } from "react-router-dom";

export default function Comments({ setShowLoginForm, setCommentsNum }) {
  const url = window.location.href;
  const dispatch = useDispatch();
  const { postId } = useParams();
  const comments = useSelector((state) => Object.values(state.comments));
  const [sortType, setSortType] = useState("Best");
  const [showLoader, setShowLoader] = useState(true);
  const [comment, setComment] = useState(url.slice(-15).includes("comment"));

  const commentIdPattern = /#comment-(\d+)/;
  const match = url.match(commentIdPattern);
  const commentUrl = match ? match[1] : null;

  useEffect(() => {
    dispatch(getComments(+postId));
  }, [dispatch, postId]);

  console.log("postId:", postId);
  console.log("comments:", comments);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setCommentsNum(comments.length);
  }, [setCommentsNum, comments.length]);

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
      <CommentForm setShowLoginForm={setShowLoginForm} postId={postId} />
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
