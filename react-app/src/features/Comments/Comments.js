import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CommentSorting from "./CommentSorting";
import CommentForm from "./CommentForms/CommentForm";
import Comment from "./Comment";
import "./Comments.css";
import { getComments } from "../../store/comments";
import { useParams } from "react-router-dom";

export default function Comments({ setShowLoginForm, post, setCommentsNum }) {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const comments = useSelector((state) => Object.values(state.comments));
  const [sortType, setSortType] = useState("Best");
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    dispatch(getComments(+postId));
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

  if (sortType === "Controversial") {
    /*
      It counts the votes on a post. If there are more than a few votes on the post and the number of upvotes is roughly equal to the number of downvotes then it's controversial.

      1 upvote + 1 downvote = 0 points, but not controversial.
      2 upvotes + 1 downvote = 1 point, but not controversial.
      1 upvotes + 2 downvotes = -1 point, but not controversial.
      11 upvotes + 11 downvotes = 0 points, and controversial.
      12 upvotes + 11 downvotes = 1 point, and controversial.
      11 upvotes + 12 downvotes = -1 point, and controversial.
    */

    comments.sort((a, b) => {
      if (a.votes > 4) {
        if (a.upvotes + a.downvotes > -2 && a.upvotes + a.downvotes < 2) {
          return a - b;
        }
      } else if (b.votes > 4) {
        if (b.upvotes + b.downvotes > -2 && b.upvotes + b.downvotes < 2) {
          return b - a;
        }
      }
    });
  }

  setTimeout(() => {
    setShowLoader(false);
  }, 1000);

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
            comments.map((comment) => (
              <Comment
                key={comment.id}
                commentId={comment.id}
                postId={+postId}
              />
            ))}
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
