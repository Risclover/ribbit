import React, { useEffect } from "react";
import moment from "moment";
import Username from "../../../components/Username/Username";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

export default function SinglePostAuthorBar({
  communityPage,
  community,
  post,
  isPage,
}) {
  const history = useHistory();
  const communityHref = `/c/${community?.id}`;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--community-base-color",
      community?.communitySettings[community.id]?.baseColor
    );
  }, []);

  console.log("base color tres");

  return (
    <div className="single-post-author-bar">
      {isPage !== "community" && (
        <div className="single-post-community-info">
          <div className="single-post-community-img">
            <img
              style={{
                backgroundColor: `${
                  community?.communitySettings[community.id].baseColor
                }`,
              }}
              src={community?.communityImg}
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
              c/{community?.name}
            </span>
          </div>

          <span className="single-post-dot-spacer">•</span>
        </div>
      )}

      <div className="single-post-author-info">
        Posted by
        <Username
          community={communityPage}
          username={post.postAuthor.username}
          user={post.postAuthor}
          source="singlepost"
        />
        {moment(new Date(post.createdAt)).locale("en-post").fromNow()}
      </div>
    </div>
  );
}
