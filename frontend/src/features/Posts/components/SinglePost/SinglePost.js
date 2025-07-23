import React, { useContext, useEffect } from "react";
import { useAppSelector } from "@/store";
import { NavLink, useHistory } from "react-router-dom";
import { PostFormatContext } from "@/context";
import {
  SinglePostKarmabar,
  SinglePostAuthorBar,
  SinglePostContent,
  SinglePostButtonBar,
  CompactPostFormat,
  ClassicPostFormat,
} from "@/features";
import "./SinglePost.css";

export const OldSinglePost = ({
  link,
  id,
  isPage,
  post,
  handleCommentsButtonClick,
}) => {
  const history = useHistory();
  const cuser = useAppSelector((state) => state.session.user);
  const user = useAppSelector((state) => state.users?.[cuser?.id]);
  const community = useAppSelector(
    (state) => state.communities.communities?.[post?.community.id]
  );
  const { format, setFormat } = useContext(PostFormatContext);

  useEffect(() => {
    if (isPage !== "profile") {
      const savedFormat = localStorage.getItem("selectedPostFormat");
      setFormat(savedFormat);
    }

    if (isPage === "singlepage") {
      setFormat("Card");
    }
  }, []);

  return (
    <article className="single-post">
      <div
        onClick={() => history.push(`/posts/${post.id}`)}
        role="link"
        tabIndex={0}
      >
        {(isPage === "profile" || format === "Card") && (
          <div className="post-card-format">
            {post && (
              <div
                className={`single-post-container${
                  isPage !== "singlepage" ? " container-dark" : ""
                }`}
              >
                <SinglePostKarmabar post={post} />
                <div className="single-post-main">
                  <SinglePostAuthorBar
                    communityPage={
                      isPage === "singlepage" || isPage === "community"
                    }
                    post={post}
                    isPage={isPage}
                  />

                  <SinglePostContent link={link} post={post} isPage={isPage} />

                  <SinglePostButtonBar
                    post={post}
                    community={community}
                    isPage={isPage}
                    user={user}
                    handleCommentsButtonClick={handleCommentsButtonClick}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {isPage !== "profile" && format === "Classic" && (
        <ClassicPostFormat id={id} isPage={isPage} post={post} />
      )}
      {isPage !== "profile" && format === "Compact" && (
        <CompactPostFormat id={id} isPage={isPage} post={post} />
      )}
    </article>
  );
};
