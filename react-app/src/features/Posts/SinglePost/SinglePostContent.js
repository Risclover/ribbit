import React from "react";
import parse from "html-react-parser";
import cutLink from "./SliceUrl";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SinglePostContent({ post, isPage }) {
  return (
    <div className="single-post-content-box">
      <div className="single-post-content-box-left">
        <div className="single-post-title-bar">
          {post.title || <Skeleton />}
        </div>
        {post.imgUrl !== null ? (
          <div className="single-post-content-image">
            <LazyLoad height={700} offset={100}>
              <img
                className="image-post-img"
                src={post.imgUrl}
                alt="Post"
                onClick={(e) => {
                  isPage === "singlepage" &&
                    window.open(`/images/${post.id}`, "_blank");
                }}
              />
            </LazyLoad>
          </div>
        ) : post.linkUrl !== null ? (
          <a
            href={post.linkUrl}
            className={`single-page-content-link${
              isPage === "community" || isPage === "singlepage"
                ? " community-post"
                : ""
            }`}
            target="_blank"
          >
            {cutLink(post.linkUrl)}
            <HiOutlineExternalLink />
          </a>
        ) : post.imgUrl === null && post.linkUrl === null ? (
          <div
            className={
              isPage === "singlepage"
                ? "single-page-content"
                : "single-post-content"
            }
            style={{ whiteSpace: "pre-line" }}
          >
            {parse(post.content) || <Skeleton />}
          </div>
        ) : (
          ""
        )}
      </div>

      {post.linkUrl && (
        <button
          onClick={(e) => {
            e.preventDefault();
            window.open(post.linkUrl);
          }}
          className={`single-post-content-box-right${
            isPage === "community" || isPage === "singlepage"
              ? " community-post"
              : ""
          }`}
        >
          <FiLink />
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
