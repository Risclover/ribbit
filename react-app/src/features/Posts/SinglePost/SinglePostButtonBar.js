import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DeletePostModal } from "../DeletePost";
import Bounce from "@/assets/images/misc/curved-arrow.png";
import { Modal } from "@/context";
import { DeleteConfirmationModal } from "@/components";
import { usePostButtonHandlers } from "../hooks/usePostButtonHandlers";

export function SinglePostButtonBar({ post, community, isPage, user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { copyLink, editPost, handleDelete } = usePostButtonHandlers(
    history,
    dispatch,
    post,
    setShowLinkCopied,
    isPage,
    setShowDeleteModal
  );

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
            <svg
              fill="currentColor"
              width="20px"
              height="20px"
              viewBox="0 0 1920.00 1920.00"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              stroke-width="0.019200000000000002"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="7.68"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="m1246.246 64-90.496 90.496 477.952 477.952h-590.848C467.878 632.448.038 1100.416.038 1675.392v109.056h128v-109.056c0-504.576 410.368-914.944 914.816-914.944h590.848l-477.952 478.08 90.496 90.496 632.448-632.576L1246.246 64Z"
                  fill-rule="evenodd"
                ></path>{" "}
              </g>
            </svg>
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

      {user && (user.id === post.postAuthor?.id || user?.id === 1) && (
        <div className="logged-in-btns">
          <div className="single-post-button">
            {post?.imgUrl === null && post?.linkUrl === null && (
              <button className="single-post-edit-btn" onClick={editPost}>
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
