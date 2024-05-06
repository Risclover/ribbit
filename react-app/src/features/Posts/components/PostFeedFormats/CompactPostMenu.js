import React, { useRef } from "react";
import { DeletePostModal } from "../../DeletePost";
import { useHistory } from "react-router-dom";
import Bounce from "../../../../assets/images/misc/curved-arrow.png";
import { useOutsideClick } from "../../../../hooks";

export const CompactPostMenu = ({
  user,
  post,
  isPage,
  community,
  setShowLinkCopied,
  setShowSubmenu,
  showLinkCopied,
}) => {
  const wrapperRef = useRef();
  const history = useHistory();

  useOutsideClick(wrapperRef, () => setShowSubmenu(false));

  return (
    <>
      <div className="compact-post-menu" ref={wrapperRef}>
        <button
          className="compact-post-menu-btn"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setShowLinkCopied(true);
            navigator.clipboard.writeText(
              `https://ribbit-app.herokuapp.com/posts/${post?.id}`
            );
          }}
        >
          <div className="compact-post-menu-btn-icon">
            <img src={Bounce} alt="Share" />
          </div>
          <div className="compact-post-menu-btn-title">Share</div>
        </button>
        {user &&
          user.id === post?.postAuthor.id &&
          post?.imgUrl === null &&
          post?.linkUrl === null && (
            <button
              className="compact-post-menu-btn"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                history.push(`/posts/${post?.id}/edit`);
              }}
            >
              <div className="compact-post-menu-btn-icon">
                <i className="fa-solid fa-pencil"></i>
              </div>
              <div className="compact-post-menu-btn-title">Edit</div>
            </button>
          )}
        <DeletePostModal
          post={post}
          community={community}
          isPage={isPage}
          postType="compact"
        />
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
    </>
  );
};
