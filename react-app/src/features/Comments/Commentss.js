import React from "react";
import { Comment } from "./Comment";
import { CommentSearch } from "./CommentSearch";
import { CommentSorting } from "./CommentSorting";

export const Comments = () => {
  return (
    <div>
      <div className="sort-search">
        <CommentSorting sortType={sortType} setSortType={setSortType} />
        <span className="comment-sort-search-separator">|</span>
        <CommentSearch post={post} />
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
};
