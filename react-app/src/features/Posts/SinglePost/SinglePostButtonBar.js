import React, { useEffect, useState } from "react";
import Bounce from "../../../images/misc/curved-arrow.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DeletePostModal from "../DeletePost";

export default function SinglePostButtonBar({ post, community, isPage, user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [commentNum, setCommentNum] = useState(0);

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
    setCommentNum(post?.commentNum);
  }, [dispatch, showLinkCopied, commentNum, post?.commentNum]);

  return (
    <div className="single-post-button-bar">
      <div className="single-post-button">
        <button className="single-post-comments-btn">
          <i className="fa-regular fa-message"></i>{" "}
          <span className="single-post-comments-num">
            {commentNum}{" "}
            {Object.values(post.postComments).length === 1
              ? "Comment"
              : "Comments"}
          </span>
        </button>
      </div>

      <div className="share-btn-stuff">
        <div className="single-post-button" onClick={(e) => e.preventDefault()}>
          <button
            className="single-post-share-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowLinkCopied(true);
              navigator.clipboard.writeText(
                `https://ribbit-app.herokuapp.com/posts/${post.id}`
              );
            }}
          >
            <img src={Bounce} alt="Share" className="single-post-share-icon" />
            Share
          </button>
        </div>

        {showLinkCopied && (
          <div
            className={
              showLinkCopied
                ? "animate-mount tooltiptext"
                : "animate-unmount tooltiptext"
            }
          >
            Link Copied to Clipboard
          </div>
        )}
      </div>

      {user && user.id === post.postAuthor.id && (
        <div className="logged-in-btns">
          <div
            className="single-post-button"
            onClick={(e) => e.preventDefault()}
          >
            {post?.imgUrl === null && post?.linkUrl === null && (
              <button
                className="single-post-edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/posts/${post.id}/edit`);
                }}
              >
                <i className="fa-solid fa-pencil"></i>
                Edit
              </button>
            )}
          </div>

          <div className="single-post-button">
            <DeletePostModal
              post={post}
              community={community}
              isPage={isPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
