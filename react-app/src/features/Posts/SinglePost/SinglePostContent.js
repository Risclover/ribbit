import React, { useEffect, useState } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import parse from "html-react-parser";
import LazyLoad from "react-lazyload";
import "react-loading-skeleton/dist/skeleton.css";
import { sliceUrl } from "../../../utils";
import { useHistory } from "react-router-dom";
import { useMetadata } from "../../../context/Metadata";

export function SinglePostContent({ post, isPage }) {
  const { metadata, fetchMetadata } = useMetadata();

  useEffect(() => {
    if (post.linkUrl && !metadata[post.linkUrl]) {
      fetchMetadata(post.linkUrl);
    }
  }, [post]);

  const metadataResult = metadata[post.linkUrl];

  return (
    <div className="single-post-content-box">
      <div className="single-post-content-box-left">
        <div className="single-post-title-bar">{post.title}</div>
        {post.imgUrl !== null ? (
          <div className="single-post-content-image">
            <LazyLoad height={700} offset={100}>
              <a href={post.imgUrl} target="_blank">
                <img className="image-post-img" src={post.imgUrl} alt="Post" />
              </a>
            </LazyLoad>
          </div>
        ) : post.linkUrl !== null ? (
          <div
            onClick={(e) => {
              window.open(post?.linkUrl, "_blank");
            }}
            className={`single-page-content-link${
              isPage === "community" || isPage === "singlepage"
                ? " community-post"
                : ""
            }`}
          >
            {sliceUrl(post.linkUrl)}
            <HiOutlineExternalLink />
          </div>
        ) : post.imgUrl === null && post.linkUrl === null ? (
          <div
            className={
              isPage === "singlepage"
                ? "single-page-content"
                : "single-post-content"
            }
            style={{ whiteSpace: "pre-line" }}
          >
            {parse(post?.content)}
          </div>
        ) : (
          ""
        )}
      </div>

      {post.linkUrl && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            window.open(post.linkUrl);
          }}
          className={`single-post-content-box-right${
            isPage === "community" || isPage === "singlepage"
              ? " community-post"
              : ""
          }`}
        >
          {metadataResult && (
            <img className="link-url-img" src={metadataResult} />
          )}
          {!metadataResult && <FiLink />}
          <div
            className={`single-post-external-link-box${
              isPage === "community" || isPage === "singlepage"
                ? " community-post"
                : ""
            }`}
          >
            <HiOutlineExternalLink />
          </div>
        </button>
      )}
    </div>
  );
}
