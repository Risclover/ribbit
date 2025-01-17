import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeletePostModal } from "../DeletePost";
import { Modal } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import { usePostButtonHandlers } from "../../hooks/usePostButtonHandlers";
import { PencilIcon } from "assets/icons/PencilIcon";
import { ShareIcon } from "assets/icons/ShareIcon";

export function SinglePostButtonBar({ post, community, isPage, user }) {
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <div className="single-post-button-bar">
      <div className="single-post-button">
        <button className="single-post-comments-btn">
          <i className="fa-regular fa-message"></i>{" "}
          <span className="single-post-comments-num">
            {post?.commentNum || 0}{" "}
            {post && Object.values(post?.postComments).length === 1
              ? "Comment"
              : "Comments"}
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

            <div className="single-post-button">
              <DeletePostModal
                post={post}
                community={community}
                isPage={isPage}
                setShowDeleteModal={setShowDeleteModal}
              />
            </div>
            {showDeleteModal && (
              <Modal
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
