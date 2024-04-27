import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { PostFormatContext } from "../../../context/PostFormat";
import {
  SinglePostKarmabar,
  SinglePostAuthorBar,
  SinglePostContent,
  SinglePostButtonBar,
} from "../..";
import "./SinglePost.css";
import { CompactPostFormat, ClassicPostFormat } from "../../../components";
import { useHistory } from "react-router-dom";

export const SinglePost = ({ id, isPage, post }) => {
  // const post = useSelector((state) => state.posts[id]);
  const history = useHistory();
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users?.[cuser?.id]);
  const community = useSelector(
    (state) => state.communities?.[post?.communityId]
  );
  const [tempFormat, setTempFormat] = useState(
    isPage === "profile" ? "Card" : ""
  );
  const { format } = useContext(PostFormatContext);

  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/posts/${post.id}`);
  };

  return (
    <article onClick={handleClick}>
      {(tempFormat === "Card" || format === "Card") && (
        <div className="post-card-format">
          {post && (
            <div className="single-post-container">
              <SinglePostKarmabar
                post={post}
                upvote={upvote}
                downvote={downvote}
                setUpvote={setUpvote}
                setDownvote={setDownvote}
              />

              <div className="single-post-main">
                <SinglePostAuthorBar
                  communityPage={isPage === "singlepage"}
                  post={post}
                  community={community}
                  isPage={isPage}
                />

                <SinglePostContent post={post} isPage="singlepage" />

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
