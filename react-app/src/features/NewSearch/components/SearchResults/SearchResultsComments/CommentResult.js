import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Username } from "@/components";
import { CommunityImg } from "components/CommunityImg";

export function CommentResult({ comment }) {
  const history = useHistory();
  const posts = useSelector((state) => Object.values(state.posts));
  const post = posts.find((post) => post.id === comment.postId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/posts/${comment.postId}/#comment-${comment.id}`);
  };

  const handleCommunityClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    history.push(`/c/${post.communityName}`);
  };

  if (!post || !comment) return null;

  return (
    <NavLink to={`/posts/${comment.postId}`}>
      <div className="search-results-page-comment">
        <div className="search-results-comment-post-header">
          <div onClick={handleCommunityClick}>
            <div
              className="search-results-comment-community-img"
              style={{
                backgroundColor:
                  post.communitySettings[post.communityId].baseColor,
              }}
            >
              <CommunityImg
                imgSrc={post.communitySettings[post.communityId].communityIcon}
                imgAlt="Comment community"
                imgStyle={{
                  backgroundColor: `${
                    post.communitySettings[post.communityId].baseColor
                  }`,
                }}
              />
            </div>
          </div>
          <div
            className="search-results-comment-community"
            onClick={handleCommunityClick}
          >
            c/{post.communityName}
          </div>
          <div className="search-results-comment-dot">•</div>{" "}
          <div className="search-results-comment-post-author-box">
            Posted by{" "}
            <Username
              username={post?.postAuthor?.username}
              user={post?.postAuthor}
              source="singlepost"
            />
            {moment(post.createdAt).fromNow()}
          </div>
        </div>
        <div className="search-results-comment-post-title">{post.title}</div>
        <NavLink
          to={`/posts/${comment.postId}/#comment-${comment.id}`}
          className="search-results-comment-body"
        >
          <div className="search-results-comment-author-img-box">
            <NavLink to={`/users/${comment.userId}/profile`}>
              <img
                src={comment.commentAuthor.profileImg}
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
        </NavLink>
        <div className="search-results-comment-post-link">Go to thread</div>
        <div className="search-results-comment-post-footer">
          <span className="search-results-comment-post-votes">
            {post.votes} {post.votes === 1 ? "upvote" : "upvotes"}
          </span>{" "}
          {Object.values(post.postComments).length}{" "}
          {Object.values(post.postComments).length === 1
            ? "comment"
            : "comments"}
        </div>
      </div>
    </NavLink>
  );
}
