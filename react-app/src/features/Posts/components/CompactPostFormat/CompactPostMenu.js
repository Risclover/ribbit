import React, { useEffect, useRef, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Bounce from "../../../../assets/images/misc/curved-arrow.png";
import { useOutsideClick } from "../../../../hooks";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { DeletePostModal } from "../../DeletePost";
import { usePostButtonHandlers } from "../../hooks/usePostButtonHandlers";
import { DeleteConfirmationModal } from "../../../../components";
import { Modal } from "../../../../context";

export const CompactPostMenu = ({ user, post, isPage, community }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef();
  const history = useHistory();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { toggleSubmenu, copyLink, editPost, handleDelete } =
    usePostButtonHandlers(
      history,
      dispatch,
      post,
      setShowLinkCopied,
      isPage,
      setShowDeleteModal,
      setShowSubmenu
    );

  useEffect(() => {
    if (showLinkCopied) {
      const timer = setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLinkCopied]);

  useOutsideClick(wrapperRef, () => setShowSubmenu(false));

  return (
    <>
      <div className="compact-post-menu-wrapper">
        <button className="compact-post-menu-face" onClick={toggleSubmenu}>
          <BsThreeDots />
        </button>
      </div>
      {showSubmenu && (
        <div className="compact-post-menu" ref={wrapperRef}>
          <button className="compact-post-menu-btn" onClick={copyLink}>
            <div className="compact-post-menu-btn-icon">
              <img src={Bounce} alt="Share" />
            </div>
            <div className="compact-post-menu-btn-title">Share</div>
          </button>
          {user &&
            user.id === post?.postAuthor.id &&
            !post?.imgUrl &&
            !post?.linkUrl && (
              <button className="compact-post-menu-btn" onClick={editPost}>
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
            setShowDeleteModal={setShowDeleteModal}
          />
        </div>
      )}
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
