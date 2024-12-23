import React, { useEffect } from "react";
import moment from "moment";
import { sliceUrl } from "@/utils";
import { NavLink, useHistory } from "react-router-dom";
import { Username } from "@/components";
import { useMetadata } from "@/context";
import { CommunityImg } from "components/CommunityImg";
import { PostTypeLinkIcon } from "assets/icons/PostTypeLinkIcon";

export const PostResult = ({ post }) => {
  const history = useHistory();

  const { metadata, fetchMetadata } = useMetadata();

  useEffect(() => {
    if (post.linkUrl && !metadata[post.linkUrl]) {
      fetchMetadata(post.linkUrl);
    }
  }, [post]);

  const metadataResult = metadata[post.linkUrl];

  const handlePostClick = (e) => {
    e.preventDefault();
    history.push(`/posts/${post?.id}`);
  };

  const handleCommunityClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push(`/c/${post?.communityName}`);
  };

  return (
    <div onClick={handlePostClick} className="search-results-post">
      <div className="search-results-post-topbar">
        <CommunityImg
          imgClass="search-results-post-topbar-img"
          imgStyle={{
            backgroundColor: `${
              post?.communitySettings[post?.communityId]?.baseColor
            }`,
          }}
          imgSrc={post?.communitySettings[post?.communityId]?.communityIcon}
          imgAlt="Community"
          imgClick={handleCommunityClick}
        />
        <div className="results-post-community" onClick={handleCommunityClick}>
          c/{post?.communityName}
        </div>{" "}
        <span className="topbar-dot">•</span>{" "}
        <span className="results-topbar-info">
          Posted by{" "}
          <Username
            username={post?.postAuthor.username}
            user={post.postAuthor}
            community={post.communityId}
            source="singlepost"
          />
          {/* <NavLink to={`/users/${post?.postAuthor.id}/profile`}>
            <span className="results-post-author">
              u/{post?.postAuthor.username}
            </span>
          </NavLink>{" "} */}
          {moment(new Date(post?.createdAt)).fromNow()}
        </span>
      </div>
      <div className="search-results-post-content">
        <div>
          <h3 className="search-results-post-title">{post?.title}</h3>
          <NavLink
            to={post?.linkUrl || ""}
            target="_blank"
            className="search-results-post-link"
          >
            {post?.linkUrl && sliceUrl(post?.linkUrl)}
          </NavLink>
        </div>

        {post?.imgUrl !== null && (
          <div
            className="search-results-post-img"
            style={{ backgroundImage: `url(${post?.imgUrl})` }}
          ></div>
        )}
        {post?.linkUrl !== null && metadataResult && (
          <div className="search-results-post-link-img">
            <img src={metadataResult} alt={post?.title} />

            <div className="type-link-icon">
              <PostTypeLinkIcon />
            </div>
          </div>
        )}
      </div>
      <div className="search-results-post-stats">
        <span className="search-results-post-stat">
          {post?.votes} {post?.votes === 1 ? "upvote" : "upvotes"}
        </span>
        <span className="search-results-post-stat">
          {Object.values(post?.postComments).length}{" "}
          {Object.values(post?.postComments).length === 1
            ? "comment"
            : "comments"}
        </span>
      </div>
    </div>
  );
};
