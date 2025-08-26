import React from "react";
import SinglePostVotingBtns from "./SinglePostVotingBtns";
import SinglePost from "./SinglePost";
import SinglePostAuthorBar from "./SinglePostAuthorBar";
import { SinglePostButtonBar } from "./SinglePostButtonBar";
import { SinglePostContent } from "@/features/Posts";
import { useAppSelector } from "@/store";

export default function CardPostFormat({
  link,
  post,
  isPage,
  handleCommentsBtnClick,
}) {
  const cuser = useAppSelector((state) => state.session.user);
  const user = useAppSelector((state) => state.users.users?.[cuser?.id]);
  const community = useAppSelector(
    (state) => state.communities.communities[post?.communityId]
  );
  return (
    <div className="card-post-format">
      <div
        className={`single-post-container${
          isPage !== "singlepage" ? " container-dark" : ""
        }`}
      >
        <SinglePostVotingBtns post={post} />
        <div className="single-post-main">
          <SinglePostAuthorBar
            community={isPage === "singlepage" || isPage === "community"}
            post={post}
            isPage={isPage}
            format="Card"
          />
          <SinglePostContent post={post} link={link} isPage={isPage} />
          <SinglePostButtonBar
            post={post}
            isPage={isPage}
            user={user}
            community={community}
            handleCommentsBtnClick={handleCommentsBtnClick}
          />
        </div>
      </div>
    </div>
  );
}
