import React from "react";
import parse from "html-react-parser";
import cutLink from "./SliceUrl";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import LazyLoad from "react-lazyload";

export default function SinglePostContent({ post, isPage }) {
  return (
    <div className="single-post-content-box">
      <div className="single-post-content-box-left">
        <div className="single-post-title-bar">{post.title}</div>
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
          <div
            className="single-page-content-link"
            onClick={(e) => {
              e.preventDefault();
              window.open(post.linkUrl);
            }}
          >
            {cutLink(post.linkUrl)}
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
            {parse(post.content)}
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
          className="single-post-content-box-right"
        >
          <FiLink />
          <div className="single-post-external-link-box">
            <HiOutlineExternalLink />
          </div>
        </button>
      )}
    </div>
  );
}
