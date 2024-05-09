import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Username } from "@/components";

moment.updateLocale("en-post", {
  relativeTime: {
    future: (diff) => (diff === "just now" ? diff : `in ${diff}`),
    past: (diff) => (diff === "just now" ? diff : `${diff} ago`),
    s: "just now",
    ss: "just now",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

export function SinglePostAuthorBar({
  communityPage,
  community,
  post,
  isPage,
}) {
  const history = useHistory();
  const communityHref = `/c/${post?.communityName}`;

  useEffect(() => {
    const communitySettings = post?.communitySettings?.[post?.communityId];
    if (communitySettings) {
      document.documentElement.style.setProperty(
        "--community-base-color",
        communitySettings.baseColor
      );
    }
  }, []);

  return (
    <div className="single-post-author-bar">
      {isPage !== "community" && (
        <div className="single-post-community-info">
          <div className="single-post-community-img">
            <img
              style={{
                backgroundColor: `${
                  post?.communitySettings?.[post?.communityId]?.baseColor
                }`,
              }}
              src={post?.communitySettings?.[post?.communityId]?.communityIcon}
              alt="Community"
            />
          </div>

          <div className="single-post-community-name">
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                history.push(communityHref);
              }}
            >
              c/{post?.communityName}
            </span>
          </div>

          <span className="single-post-dot-spacer">•</span>
        </div>
      )}

      <div className="single-post-author-info">
        Posted by
        <Username
          community={communityPage}
          username={post?.postAuthor?.username}
          user={post?.postAuthor}
          source="singlepost"
        />
        {moment(new Date(post?.createdAt)).locale("en-post").fromNow()}
      </div>
    </div>
  );
}
