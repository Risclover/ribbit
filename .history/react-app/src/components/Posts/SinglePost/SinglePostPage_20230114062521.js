import React from "react";
import { useParams, NavLink } from "react-router-dom";
import SinglePost from "./SinglePost";

export default function SinglePostPage() {
  const { postId } = useParams();

  return (
    <div className="single-post-page">
      {post && (
        <div className="single-post-container">
          <div className="single-post-karmabar">&nbsp;</div>
          <div className="single-post-main">
            <div className="single-post-author-bar">
              <div className="single-post-community-info">
                <div className="single-post-community-img"></div>
                <div className="single-post-community-name">
                  <NavLink to="/">c/community</NavLink>
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
            <div className="single-post-content">{post.content}</div>
            {user && user.id === post.postAuthor.id ? (
              <div className="single-post-button-bar">
                <div className="single-post-button">
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
                </div>
                <div className="single-post-button">
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
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
}
