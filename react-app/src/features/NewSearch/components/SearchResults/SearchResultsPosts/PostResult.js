import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { sliceUrl } from "../../../../../utils";
import { Link } from "react-router-dom";
import { FiLink } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { Username } from "../../../../../components";

export const PostResult = ({ post }) => {
  const history = useHistory();
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
    <div
      onClick={() => history.push(`/posts/${post?.id}`)}
      className="search-results-post"
    >
      <div className="search-results-post-topbar">
        <img
          className="search-results-post-topbar-img"
          style={{
            backgroundColor: `${
              post?.communitySettings[post?.communityId]?.baseColor
            }`,
          }}
          src={post?.communitySettings[post?.communityId]?.communityIcon}
          alt="Community"
        />
        <NavLink
          className="results-post-community"
          to={`/c/${post?.communityName}`}
        >
          c/{post?.communityName}
        </NavLink>{" "}
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
          <a
            href={post?.linkUrl}
            target="_blank"
            className="search-results-post-link"
          >
            {post?.linkUrl && sliceUrl(post?.linkUrl)}
          </a>
        </div>
        {post?.imgUrl !== null && (
          <img
            className="search-results-post-img"
            src={post?.imgUrl}
            alt={post?.title}
          />
        )}
        {post?.linkUrl !== null && metadataResult?.image && (
          <div className="search-results-post-link-img">
            <img src={metadataResult?.image} alt={post?.title} />

            <div class="type-link-icon">
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
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
