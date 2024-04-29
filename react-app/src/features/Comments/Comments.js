import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComments, searchPostComments } from "../../store";
import { CommentSorting, CommentForm, Comment } from "..";
import "./Comments.css";
import { useHistory } from "react-router-dom";

export function Comments({ post }) {
  const url = window.location.href;
  const history = useHistory();
  const dispatch = useDispatch();
  const { postId } = useParams();

  const comments = useSelector((state) => Object.values(state.comments));
  const [sortType, setSortType] = useState("Best");
  const [showLoader, setShowLoader] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const commentIdPattern = /#comment-(\d+)/;
  const match = url.match(commentIdPattern);
  const commentUrl = match ? match[1] : null;
  const specificComment = match
    ? comments?.find((comment) => comment.id === +match[1])
    : null;
  const [specificCommentActive, setSpecificCommentActive] = useState(false);

  useEffect(() => {
    dispatch(getComments(+postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (match && match[1]) setSpecificCommentActive(true);
  }, [specificComment]);

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
      <form>
        <label htmlFor="comment-search">
          Search:
          <input
            id="comment-search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </label>
        <button
          onClick={async (e) => {
            e.preventDefault();
            const data = await dispatch(
              searchPostComments(post.id, searchValue)
            );
            console.log("data:", data);
          }}
        >
          Search for comments
        </button>
      </form>
      <CommentForm postId={postId} />
      <div className="sort-search">
        <CommentSorting sortType={sortType} setSortType={setSortType} />
        <span className="comment-sort-search-separator">|</span>
      </div>
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
            !specificCommentActive &&
            comments.map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                commentId={comment.id}
                postId={+postId}
              />
            ))}

          {specificCommentActive && (
            <div className="specific-comment">
              <button
                className="view-all-comments-btn"
                onClick={() => {
                  setSpecificCommentActive(false);
                  history.push(`/posts/${+postId}`);
                }}
              >
                View all comments
              </button>
              <Comment
                key={+commentUrl}
                commentId={+commentUrl}
                postId={+postId}
                specificCommentActive={specificCommentActive}
                comment={specificComment}
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
