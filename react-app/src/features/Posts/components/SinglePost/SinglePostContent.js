import React, { useEffect } from "react";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import parse from "html-react-parser";
import LazyLoad from "react-lazyload";
import { sliceUrl } from "@/utils";
import { useMetadata } from "@/context";
import "react-loading-skeleton/dist/skeleton.css";
import { Text } from "@/features/Comments/components/Comment/Text";
import Skeleton from "@mui/material/Skeleton";
import { NavLink } from "react-router-dom";

export function SinglePostContent({ link, post, isPage }) {
  const { metadata, fetchMetadata } = useMetadata();

  useEffect(() => {
    if (post.linkUrl && !metadata[post.linkUrl]) {
      fetchMetadata(post.linkUrl);
    }
  }, [post]);

  const metadataResult = metadata[post.linkUrl];

  const handleImgClick = () => {
    if (isPage === "singlepage") {
      // Encode the image URL to safely include it as a query parameter
      const encodedUrl = encodeURIComponent(post.imgUrl);
      // Construct the new URL pointing to Ribbit's media viewer
      const mediaUrl = `${window.location.origin}/c/${post.communityName}/media?url=${encodedUrl}`;
      // Open the media viewer in a new tab
      window.open(mediaUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      {link ? (
        <NavLink to={link}>
          <div className="single-post-content-box">
            <div className="single-post-content-box-left">
              <div className="single-post-title-bar">
                {post !== undefined && link ? (
                  <NavLink to={link}>{post?.title}</NavLink>
                ) : post !== undefined && !link ? (
                  post.title
                ) : (
                  <Skeleton variant="text" animation="wave" />
                )}
              </div>
              {post.imgUrl !== null ? (
                <div className="single-post-content-image">
                  <LazyLoad height={700} offset={100}>
                    <div onClick={handleImgClick}>
                      <img
                        className="image-post-img"
                        src={post.imgUrl}
                        alt="Post"
                      />
                    </div>
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
                  <Text content={post?.content} />
                </div>
              ) : (
                ""
              )}
            </div>

            {post.linkUrl && (
              <button
                aria-label="Open external link"
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
                  <img
                    className="link-url-img"
                    src={metadataResult}
                    alt="Link preview"
                  />
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
        </NavLink>
      ) : (
        <div className="single-post-content-box">
          <div className="single-post-content-box-left">
            <div className="single-post-title-bar">
              {post !== undefined && link ? (
                <NavLink to={link}>{post?.title}</NavLink>
              ) : post !== undefined && !link ? (
                post.title
              ) : (
                <Skeleton variant="text" animation="wave" />
              )}
            </div>
            {post.imgUrl !== null ? (
              <div className="single-post-content-image">
                <LazyLoad height={700} offset={100}>
                  <div onClick={handleImgClick}>
                    <img
                      className="image-post-img"
                      src={post.imgUrl}
                      alt="Post"
                    />
                  </div>
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
                <Text content={post?.content} />
              </div>
            ) : (
              ""
            )}
          </div>

          {post.linkUrl && (
            <button
              aria-label="Open external link"
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
                <img
                  className="link-url-img"
                  src={metadataResult}
                  alt="Link preview"
                />
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
      )}
    </>
  );
}
