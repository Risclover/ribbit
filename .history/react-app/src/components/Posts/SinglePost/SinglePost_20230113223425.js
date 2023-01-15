import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../../store/posts";
import { getSinglePost } from "../../../store/one_post";
import { Modal } from "../../../context/Modal";
import moment from "moment";
import DeleteConfirmation from "../../Modals/DeleteConfirmation";

export default function SinglePost({ id }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[id]);
  const user = useSelector((state) => state.session.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    dispatch(getSinglePost(id));
    if (post.createdAt !== post.updatedAt) setIsUpdated(true);

    console.log(isUpdated);
  }, [dispatch, id, isUpdated]);

  if (!post) return null;
  return (
    <>
      {post && (
        <div className="single-post-container">
          {post.title} - {moment(new Date(post.createdAt)).fromNow()} -{" "}
          {isUpdated
            ? "edited " + moment(new Date(post.updatedAt)).fromNow()
            : ""}{" "}
          - by {post.postAuthor.username}
          <p>{post.content}</p>
          {user && user.id === post.postAuthor.id ? (
            <div className="single-post-user-buttons">
              <button
                className="single-post-delete-btn"
                onClick={async (e) => {
                  e.preventDefault();
                  setShowDeleteModal(true);
                }}
              >
                Delete
              </button>
              {showDeleteModal && (
                <Modal onClose={() => setShowDeleteModal(false)}>
                  <DeleteConfirmation
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    postId={post.id}
                  />
                </Modal>
              )}
              <button
                className="single-post-edit-btn"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/posts/${post.id}/edit`);
                }}
              >
                Edit
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
