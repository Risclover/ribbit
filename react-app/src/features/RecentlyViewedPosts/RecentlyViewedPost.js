import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { CgNotes } from "react-icons/cg";
import { FiLink } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";

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
        {linkImg && <img className="link-url-img" src={linkImg} />}
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
  const [metadataResult, setMetadataResult] = useState();

  useEffect(() => {
    const queryLink = async () => {
      if (post.linkUrl !== null) {
        var data = {
          q: post.linkUrl,
        };
        fetch("https://api.linkpreview.net", {
          method: "POST",
          headers: {
            "X-Linkpreview-Api-Key": `${process.env.REACT_APP_LINK_PREVIEW_KEY}`,
          },
          mode: "cors",
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.status != 200) {
              throw new Error("something went wrong");
            }
            return res.json();
          })
          .then((response) => {
            setMetadataResult(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    queryLink();
  }, []);
  return (
    <li className={`recent-post-li ${idx === 4 ? "li-last" : ""}`}>
      <NavLink to={`/posts/${post?.id}`}>
        <div className="recent-post">
          <PostTypeIcon post={post} linkImg={metadataResult?.image} />
          <div className="recent-post-content">
            <div className="recent-post-title">{post?.title}</div>
            <div className="recent-post-info-bar">
              {post?.votes} points
              <span className="recent-post-dot-spacer"></span>
              {post?.postComments?.length || 0} comments
              <span className="recent-post-dot-spacer"></span>
              {moment(post?.createdAt).locale("en-cust").fromNow()}
            </div>
          </div>
        </div>
      </NavLink>
    </li>
  );
};
