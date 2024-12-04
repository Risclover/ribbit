import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PostFormatContext } from "@/context/PostFormat";
import {
  SinglePostKarmabar,
  SinglePostAuthorBar,
  SinglePostContent,
  SinglePostButtonBar,
} from "@/features/Posts/SinglePost";
import { CompactPostFormat, ClassicPostFormat } from "../components";
import "./SinglePost.css";
import { PopupProvider } from "context/Popup";

export const SinglePost = ({ id, isPage, post }) => {
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users?.[cuser?.id]);
  const community = useSelector(
    (state) => state.communities?.[post?.communityId]
  );
  const [tempFormat, setTempFormat] = useState(
    isPage === "profile" ? "Card" : ""
  );
  const { format, setFormat } = useContext(PostFormatContext);

  useEffect(() => {
    if (isPage !== "profile") {
      const savedFormat = localStorage.getItem("selectedPostFormat");
      setFormat(savedFormat);
    }
    console.log("isPage:", isPage, format);

    if (isPage === "singlepage") {
      setFormat("Card");
    }
  }, []);

  return (
    <article>
      {(tempFormat === "Card" || format === "Card") && (
        <div className="post-card-format">
          {post && (
            <div className="single-post-container">
              <SinglePostKarmabar post={post} />

              <div className="single-post-main">
                <SinglePostAuthorBar
                  communityPage={
                    isPage === "singlepage" || isPage === "community"
                  }
                  post={post}
                  isPage={isPage}
                />

                <SinglePostContent post={post} isPage={isPage} />

                <SinglePostButtonBar
                  post={post}
                  community={community}
                  isPage={isPage}
                  user={user}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {tempFormat !== "Card" && format === "Classic" && (
        <ClassicPostFormat id={id} isPage={isPage} post={post} />
      )}
      {tempFormat !== "Card" && format === "Compact" && (
        <CompactPostFormat id={id} isPage={isPage} post={post} />
      )}
    </article>
  );
};
