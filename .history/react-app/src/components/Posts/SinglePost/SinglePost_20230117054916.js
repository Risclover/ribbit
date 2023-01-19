import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import moment from "moment";
import DeleteConfirmation from "../../Modals/DeleteConfirmation";
import "./SinglePost.css";
import UpdatePost from "../PostForms/UpdatePost";
import { NavLink } from "react-router-dom";
import { getComments } from "../../../store/comments";
import { getCommunities } from "../../../store/communities";

export default function SinglePost({ id, isPage }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[id]);
  const user = useSelector((state) => state.session.user);
  const community = useSelector((state) =>
    Object.values(state.singleCommunity)
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  console.log("community", community);

  useEffect(() => {
    dispatch(getComments(id));
    dispatch(getCommunities());
    // dispatch(getSinglePost(id));
  }, [dispatch, id]);

  // if (!community) return null;
  return (
    <>
      {post && (
        <div className="single-post-container">
          <div className="single-post-karmabar">&nbsp;</div>
          <div className="single-post-main">
            <div className="single-post-author-bar">
              <div className="single-post-community-info">
                <div className="single-post-community-img"></div>
                <div className="single-post-community-name">
                  <NavLink to={`/communities/${post.postCommunity.id}`}>
                    c/{post.postCommunity.name}
                  </NavLink>
                </div>
              </div>
              <span className="single-post-dot-spacer">•</span>
              <div className="single-post-author-info">
                Posted by{" "}
                <NavLink to={`/users/${post.postAuthor.id}`}>
                  u/{post.postAuthor.username}
                </NavLink>{" "}
                {moment(new Date(post.createdAt)).fromNow()}
              </div>
            </div>
            <div className="single-post-title-bar">{post.title}</div>
            <div
              className={isPage ? "single-page-content" : "single-post-content"}
            >
              {post.content}
            </div>
            {isPage && user && user.id === post.postAuthor.id ? (
              <div className="single-post-button-bar">
                <div className="single-post-button"></div>
                <div className="single-post-button">
                  <button
                    className="single-post-delete-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                  {showDeleteModal && (
                    <Modal
                      onClose={() => setShowDeleteModal(false)}
                      title="Delete post?"
                    >
                      <DeleteConfirmation
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                        postId={post.id}
                        item="post"
                      />
                    </Modal>
                  )}
                </div>
                <div className="single-post-button">
                  <button
                    className="single-post-edit-btn"
                    onClick={() => history.push(`/posts/${post.id}/edit`)}
                  >
                    Edit
                  </button>
                  {showEditModal && (
                    <Modal
                      onClose={() => setShowEditModal(false)}
                      title="Edit post"
                    >
                      <UpdatePost
                        setShowEditModal={setShowEditModal}
                        showEditModal={showEditModal}
                      />
                    </Modal>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}
