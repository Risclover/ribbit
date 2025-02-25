import { usePostButtonHandlers } from "features/Posts/hooks/usePostButtonHandlers";
import { useOutsideClick } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Bounce from "@/assets/images/misc/curved-arrow.png";

export default function CompactPostMenu({ user, post, isPage, community }) {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const history = useHistory();
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { toggleSubmenu, copyLink, editPost, handleDelete, isCommunityOwner } =
    usePostButtonHandlers({
      community,
      history,
      dispatch,
      post,
      setShowLinkCopied,
      isPage,
      setShowDeleteModal,
      setShowSubmenu,
    });

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
        <button
          aria-label="Open menu"
          className="compact-post-menu-face"
          onClick={toggleSubmenu}
        >
          <BsThreeDots />
        </button>
      </div>
      {showSubmenu && (
        <div className="compact-post-menu" ref={wrapperRef}>
          <button
            aria-label="Share post"
            className="compact-post-menu-btn"
            onClick={copyLink}
          >
            <div className="compact-post-menu-btn-icon">
              <img src={Bounce} alt="Share" />
            </div>
          </button>
        </div>
      )}
    </>
  );
}
