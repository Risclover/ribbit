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
import { getPosts } from "../../../store/posts";
import Bounce from "../../../images/curved-arrow.png";

export default function SinglePost({ id, isPage }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[id]);
  const user = useSelector((state) => state.session.user);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(getComments(id));
    dispatch(getCommunities());
    dispatch(getPosts());
  }, [dispatch, id]);

  return (
    <>
      {post && (
        <div className="single-post-container">
          <div className="single-post-karmabar">&nbsp;</div>
          <div className="single-post-main">
            <div className="single-post-author-bar">
              {isPage !== "community" && (
                <div className="single-post-community-info">
                  <div className="single-post-community-img"></div>
                  <div className="single-post-community-name">
                    <NavLink to={`/communities/${post.postCommunity.id}`}>
                      c/{post.postCommunity.name}
                    </NavLink>
                  </div>
                  <span className="single-post-dot-spacer">•</span>
                </div>
              )}

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
              className={
                isPage === "singlepage"
                  ? "single-page-content"
                  : "single-post-content"
              }
            >
              {post.content}
            </div>
            <div className="single-post-button-bar">
              <div className="single-post-button">
                <button className="single-post-comments-btn">
                  <i className="fa-regular fa-message"></i>{" "}
                  <span className="single-post-comments-num">
                    {Object.values(post.postComments).length || 0}{" "}
                    {Object.values(post.postComments).length === 1
                      ? "Comment"
                      : "Comments"}
                  </span>
                </button>
              </div>
              <div className="share-btn-stuff">
                {isPage === undefined && (
                  <NavLink to="/posts">
                    <div className="single-post-button">
                      <button
                        className="single-post-share-btn"
                        onClick={() => {
                          setShowLinkCopied(true);
                          setTimeout(() => {
                            setShowLinkCopied(false);
                          }, 1000);
                          navigator.clipboard.writeText(
                            `https://ribbit.herokuapp.com/posts/${post.id}`
                          );
                        }}
                      >
                        <img src={Bounce} className="single-post-share-icon" />
                        Share
                      </button>
                    </div>
                  </NavLink>
                )}

                {isPage === "community" && (
                  <NavLink to={`/communities/${post.communityId}`}>
                    <div className="single-post-button">
                      <button
                        className="single-post-share-btn"
                        onClick={() => {
                          setShowLinkCopied(true);
                          navigator.clipboard.writeText(
                            `https://ribbit.herokuapp.com/posts/${post.id}`
                          );
                        }}
                      >
                        <img src={Bounce} className="single-post-share-icon" />
                        Share
                      </button>
                    </div>
                  </NavLink>
                )}

                {isPage === "singlepage" && (
                  <div className="single-post-button">
                    <button
                      className="single-post-share-btn"
                      onClick={() => {
                        setShowLinkCopied(true);
                        navigator.clipboard.writeText(
                          `https://ribbit.herokuapp.com/posts/${post.id}`
                        );
                      }}
                    >
                      <img src={Bounce} className="single-post-share-icon" />
                      Share
                    </button>
                  </div>
                )}
                {showLinkCopied && (
                  <div className="tooltiptext">Link Copied to Clipboard</div>
                )}
              </div>
              {isPage === "singlepage" &&
              user &&
              user.id === post.postAuthor.id ? (
                <div className="logged-in-btns">
                  <div className="single-post-button">
                    <button
                      className="single-post-edit-btn"
                      onClick={() => history.push(`/posts/${post.id}/edit`)}
                    >
                      <i className="fa-solid fa-pencil"></i>
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
                  <div className="single-post-button">
                    <button
                      className="single-post-delete-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="fa-regular fa-trash-can"></i>
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
                          post={post}
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
        </div>
      )}
    </>
  );
}
