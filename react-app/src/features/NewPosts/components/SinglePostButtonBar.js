import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeletePostModal } from "@/features/Posts";
import { Modal, ScrollContext } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import { usePostButtonHandlers } from "@/features/Posts/hooks/usePostButtonHandlers";
import { PencilIcon } from "@/assets/icons/PencilIcon";
import { ShareIcon } from "@/assets/icons/ShareIcon";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";
import { HiOutlineExternalLink } from "react-icons/hi";
import { CgNotes } from "react-icons/cg";

export function SinglePostButtonBar({
  setPostExpand,
  postExpand,
  post,
  community,
  isPage,
  user,
  handleCommentsButtonClick,
  format,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { scrollToTarget } = useContext(ScrollContext);

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { copyLink, editPost, handleDelete, isCommunityOwner } =
    usePostButtonHandlers({
      community,
      history,
      dispatch,
      post,
      setShowLinkCopied,
      isPage,
      setShowDeleteModal,
    });

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
  }, [showLinkCopied]);

  const handleScrollToComments = (e) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/posts/${post.id}`);
    setTimeout(() => {
      scrollToTarget();
    }, 100); // delay by 100 ms (adjust if needed)
  };

  return (
    <div className="single-post-button-bar">
      {format === "Compact" && (
        <>
          {post?.linkUrl === null && post?.content !== "" && !postExpand && (
            <button
              aria-label="Expand post"
              className="classic-post-button btn-expand"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setPostExpand(true);
              }}
            >
              <BsArrowsAngleExpand />
            </button>
          )}
          {post?.linkUrl === null && postExpand && (
            <button
              aria-label="Close expanded post"
              className="classic-post-button btn-expand"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setPostExpand(false);
              }}
            >
              <BsArrowsAngleContract />
            </button>
          )}
          {post?.linkUrl !== null && (
            <button
              aria-label="Open external link"
              className="classic-post-button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                window.open(post?.linkUrl);
              }}
            >
              <HiOutlineExternalLink />
            </button>
          )}
          {post?.linkUrl === null &&
            post?.content === "" &&
            post?.imgUrl === null && (
              <button
                aria-label="Open text post"
                className="classic-post-button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open(`/posts/${post.id}`);
                }}
              >
                <CgNotes />
              </button>
            )}
          <div className="post-btn-separator"></div>
        </>
      )}
      <div className="single-post-button">
        <button
          className={
            isPage === "singlepage"
              ? "single-post-comments-btn num-btn"
              : "single-post-comments-btn"
          }
          onClick={handleScrollToComments}
        >
          <i className="fa-regular fa-message"></i>{" "}
          <span className="single-post-comments-num">
            {post?.commentNum || 0}{" "}
            {post && post?.commentNum === 1 ? "Comment" : "Comments"}
          </span>
        </button>
      </div>

      <div className="share-btn-stuff">
        <div className="single-post-button">
          <button className="single-post-share-btn" onClick={copyLink}>
            <ShareIcon />
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

      {user &&
        (isCommunityOwner ||
          user.id === post.postAuthor?.id ||
          user?.id === 1) && (
          <div className="logged-in-btns">
            <div className="single-post-button">
              {post?.imgUrl === null && post?.linkUrl === null && (
                <button className="single-post-edit-btn" onClick={editPost}>
                  <PencilIcon />
                  Edit
                </button>
              )}
            </div>

            {(isCommunityOwner || user.id === post.postAuthor?.id) && (
              <div className="single-post-button">
                <DeletePostModal
                  post={post}
                  community={community}
                  isPage={isPage}
                  setShowDeleteModal={setShowDeleteModal}
                />
              </div>
            )}
            {showDeleteModal && (
              <Modal
                close={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Delete post?"
                open={() => setShowDeleteModal(true)}
              >
                <DeleteConfirmationModal
                  showDeleteModal={showDeleteModal}
                  setShowDeleteModal={setShowDeleteModal}
                  handleDelete={handleDelete}
                  item="post"
                />
              </Modal>
            )}
          </div>
        )}
    </div>
  );
}
