import React, { useEffect, useCallback } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import LazyLoad from "react-lazyload";

import { useMetadata } from "@/context";
import { Text } from "@/features/Comments/components/Comment/Text";
import { sliceUrl } from "@/utils";

export function SinglePostContent({ link, post, isPage }) {
  const history = useHistory();
  const { metadata, fetchMetadata } = useMetadata();

  /* ---------------------- data helpers --------------------- */
  const metadataResult = metadata[post.linkUrl];
  const isCommunityPage = isPage === "community" || isPage === "singlepage";
  const containerMod = isCommunityPage ? " community-post" : "";

  /* -------------------- side‑effect: metadata -------------- */
  useEffect(() => {
    if (post.linkUrl && !metadataResult) fetchMetadata(post.linkUrl);
  }, [post, metadataResult, fetchMetadata]);

  /* --------------------- navigation helpers ---------------- */
  const goToPostPage = useCallback(() => {
    if (link) history.push(link);
  }, [history, link]);

  const openExternal = (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(post.linkUrl, "_blank", "noopener,noreferrer");
  };

  const openMediaViewer = () => {
    if (isPage === "singlepage") {
      const encodedUrl = encodeURIComponent(post.imgUrl);
      const mediaUrl = `${window.location.origin}/c/${post.community.name}/media?url=${encodedUrl}`;
      window.open(mediaUrl, "_blank", "noopener,noreferrer");
    }
  };

  /* --------------------- render helpers -------------------- */
  const Title = () =>
    post && (
      <span className={link ? "clickable-title" : undefined}>{post.title}</span>
    );

  const ImageContent = () =>
    post.imgUrl && (
      <div className="single-post-content-image">
        <LazyLoad height={700} offset={100}>
          <div onClick={openMediaViewer}>
            <img className="image-post-img" src={post.imgUrl} alt="Post" />
          </div>
        </LazyLoad>
      </div>
    );

  const LinkContent = () =>
    post.linkUrl && (
      <a
        href={post.linkUrl}
        target="_blank"
        className={`single-page-content-link${containerMod}`}
      >
        {sliceUrl(post.linkUrl)} <HiOutlineExternalLink />
      </a>
    );

  const TextContent = () =>
    !post.imgUrl &&
    !post.linkUrl && (
      <div
        className={
          isPage === "singlepage"
            ? "single-page-content"
            : "single-post-content"
        }
        style={{ whiteSpace: "pre-line" }}
      >
        <Text content={post.content} />
      </div>
    );

  const ExternalLinkButton = () =>
    post.linkUrl && (
      <button
        aria-label="Open external link"
        onClick={openExternal}
        className={`single-post-content-box-right${containerMod}`}
      >
        {metadataResult ? (
          <img
            className="link-url-img"
            src={metadataResult}
            alt="Link preview"
          />
        ) : (
          <FiLink />
        )}
        <div className={`single-post-external-link-box${containerMod}`}>
          <HiOutlineExternalLink />
        </div>
      </button>
    );

  /* --------------------------- JSX ------------------------- */
  return (
    <div
      className="single-post-content-box"
      role={link ? "button" : undefined}
      tabIndex={link ? 0 : undefined}
    >
      <div className="single-post-content-box-left">
        <div className="single-post-title-bar">
          <Title />
        </div>

        {/* ordered by likelihood for quick short‑circuiting */}
        {ImageContent() || TextContent() || LinkContent()}
      </div>

      <ExternalLinkButton />
    </div>
  );
}
