import React, { useEffect } from "react";
import moment from "moment";
import { sliceUrl } from "@/utils";
import { NavLink, useHistory } from "react-router-dom";
import { Username } from "@/components";
import { useMetadata } from "@/context";
import { CommunityImg } from "@/components/CommunityImg";
import { PostTypeLinkIcon } from "@/assets/icons/PostTypeLinkIcon";
import { Skeleton } from "@mui/material";
import { useDarkMode } from "@/hooks";

const PostResult = ({ post }) => {
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
    history.push(`/c/${post?.community.name}`);
  };

  return (
    <div onClick={handlePostClick} className="search-results-post">
      <div className="search-results-post-topbar">
        <CommunityImg
          imgClass="search-results-post-topbar-img"
          imgStyle={{
            backgroundColor: `${
              post?.communitySettings[post?.community.id]?.baseColor
            }`,
          }}
          imgSrc={post?.communitySettings[post?.community.id]?.communityIcon}
          imgAlt="Community"
          imgClick={handleCommunityClick}
        />
        <div className="results-post-community" onClick={handleCommunityClick}>
          c/{post?.community.name}
        </div>{" "}
        <span className="topbar-dot">•</span>{" "}
        <span className="results-topbar-info">
          Posted by{" "}
          <Username
            username={post?.author.username}
            user={post.author}
            community={post.community.id}
            source="singlepost"
          />
          {/* <NavLink to={`/users/${post?.author.id}/profile`}>
            <span className="results-post-author">
              u/{post?.author.username}
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
          {Object.values(post?.commentNum)}{" "}
          {Object.values(post?.commentNum) === 1 ? "comment" : "comments"}
        </span>
      </div>
    </div>
  );
};

const PostSkeleton = () => {
  const { theme } = useDarkMode();

  return (
    <div className="search-results-post">
      <div className="post-result-skeleton">
        <div className="post-result-top">
          <Skeleton
            variant="circular"
            width={20}
            height={20}
            animation="wave"
            sx={{ bgcolor: theme === "dark" && "grey.500" }}
          />
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.75rem",
              bgcolor: theme === "dark" && "grey.500",
            }}
            width={200}
            animation="wave"
          />
        </div>
        <div className="post-result-middle">
          <div className="post-result-title">
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem", bgcolor: theme === "dark" && "grey.500" }}
              width={400}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem", bgcolor: theme === "dark" && "grey.500" }}
              width={400}
              animation="wave"
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "2rem", bgcolor: theme === "dark" && "grey.500" }}
              width={320}
              animation="wave"
            />
          </div>
          <Skeleton
            variant="rounded"
            width={138}
            height={98}
            animation="wave"
            sx={{ bgcolor: theme === "dark" && "grey.500" }}
          />
        </div>
        <div className="post-result-bottom">
          <Skeleton
            variant="text"
            sx={{
              fontSize: "0.75rem",
              bgcolor: theme === "dark" && "grey.500",
            }}
            animation="wave"
            width={150}
          />
        </div>
      </div>
    </div>
  );
};

PostResult.PostSkeleton = PostSkeleton;

export { PostResult };
