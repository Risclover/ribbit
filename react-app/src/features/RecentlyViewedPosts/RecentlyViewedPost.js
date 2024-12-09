import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { CgNotes } from "react-icons/cg";
import { FiLink } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useMetadata } from "@/context";

const PostTypeIcon = ({ post, linkImg }) => {
  if (post?.imgUrl) {
    return (
      <div className="recent-post-type">
        <img src={post?.imgUrl} className="recent-post-type-img" alt="Post" />
      </div>
    );
  }
  if (post?.linkUrl) {
    return (
      <div className="recent-post-type type-link">
        {linkImg && (
          <img className="link-url-img" src={linkImg} alt="Link preview" />
        )}
        {!linkImg && (
          <div className="recent-post-type-link">
            <FiLink />
          </div>
        )}
        <div className="type-link-icon">
          <HiOutlineExternalLink />
        </div>
      </div>
    );
  }
  return (
    <div className="recent-post-type">
      <CgNotes />
    </div>
  );
};

export const RecentlyViewedPost = ({ post, idx }) => {
  const { metadata, fetchMetadata } = useMetadata();

  useEffect(() => {
    if (post.linkUrl && !metadata[post.linkUrl]) {
      fetchMetadata(post.linkUrl);
    }
  }, [post]);

  const metadataResult = metadata[post.linkUrl];
  return (
    <li className={`recent-post-li ${idx === 4 ? "li-last" : ""}`}>
      <NavLink to={`/posts/${post?.id}`}>
        <div className="recent-post">
          <PostTypeIcon post={post} linkImg={metadataResult} />
          <div className="recent-post-content">
            <div className="recent-post-title">{post?.title}</div>
            <div className="recent-post-info-bar">
              {post?.votes}{" "}
              {post?.votes === 1 || post?.votes === -1 ? "point" : "points"}
              <span className="recent-post-dot-spacer"></span>
              {Object.values(post?.postComments)?.length || 0}{" "}
              {Object.values(post?.postComments)?.length === 1
                ? "comment"
                : "comments"}
              <span className="recent-post-dot-spacer"></span>
              {moment(post?.createdAt).locale("en-cust").fromNow()}
            </div>
          </div>
        </div>
      </NavLink>
    </li>
  );
};
