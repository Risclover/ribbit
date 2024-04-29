import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export function CommentResult({ comment }) {
  const history = useHistory();
  const posts = useSelector((state) => Object.values(state.posts));
  const post = posts.find((post) => post.id === comment.postId);
  console.log("comment:", comment);
  console.log("post:", post);

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/posts/${comment.postId}/#comment-${comment.id}`);
  };

  if (!post || !comment) return null;

  return (
    <div className="search-results-page-comment" onClick={handleClick}>
      <div className="search-results-comment-post-header">
        <NavLink to={`/c/${post.communityName}`}>
          <img
            src={post.communitySettings[post.communityId].communityIcon}
            className="search-results-comment-community-img"
            alt="Comment community"
          />
        </NavLink>
        <NavLink to={`/c/${post.communityName}`}>
          <span className="search-results-comment-community">
            c/{post.communityName}
          </span>
        </NavLink>
        <span className="search-results-comment-dot">•</span>{" "}
        <span className="search-results-comment-post-author-box">
          Posted by{" "}
          <NavLink to={`/users/${comment.userId}/profile`}>
            <span className="search-results-comment-post-author">
              u/{post.postAuthor.username}
            </span>
          </NavLink>
          {moment(post.createdAt).fromNow()}
        </span>
      </div>
      <div className="search-results-comment-post-title">{post.title}</div>
      <div className="search-results-comment-body">
        <div className="search-results-comment-author-img-box">
          <NavLink to={`/users/${comment.userId}/profile`}>
            <img
              src={comment.commentAuthor.profile_img}
              className="search-results-comment-author-img"
              alt="Comment user"
            />
          </NavLink>
        </div>
        <div className="search-results-comment-body-right">
          <div className="search-results-comment-author-box">
            <NavLink to={`/users/${comment.userId}/profile`}>
              <span className="search-results-comment-author">
                {comment.commentAuthor.username}
              </span>
            </NavLink>
            <span className="search-results-comment-author-dot">·</span>{" "}
            <span className="search-results-comment-author-date">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <div className="search-results-comment">{comment.content}</div>
          <div className="search-results-comment-upvotes">
            {comment.votes} {comment.votes === 1 ? "upvote" : "upvotes"}
          </div>
        </div>
      </div>
      <div className="search-results-comment-post-link">Go to thread</div>
      <div className="search-results-comment-post-footer">
        <span className="search-results-comment-post-votes">
          {post.votes} {post.votes === 1 ? "upvote" : "upvotes"}
        </span>{" "}
        {Object.values(post.postComments).length}{" "}
        {Object.values(post.postComments).length === 1 ? "comment" : "comments"}
      </div>
    </div>
  );
}
