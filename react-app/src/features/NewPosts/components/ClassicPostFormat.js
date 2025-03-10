import React, { useContext, useEffect, useState } from "react";
import SinglePostVotingBtns from "./SinglePostVotingBtns";
import { CgNotes } from "react-icons/cg";
import { ScrollContext, useMetadata } from "context";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usePostButtonHandlers } from "features/Posts/hooks/usePostButtonHandlers";
import SinglePostAuthorBar from "./SinglePostAuthorBar";
import { SinglePostButtonBar } from "./SinglePostButtonBar";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
import { sliceUrl } from "utils";
import parse from "html-react-parser";
import { SinglePostExpanded } from "./SinglePostExpanded";

export default function ClassicPostFormat({ isPage, id, post }) {
  const { scrollToTarget } = useContext(ScrollContext);
  const { metadata, fetchMetadata } = useMetadata();
  const history = useHistory();
  const dispatch = useDispatch();

  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(post?.commentNum || 0);

  const { copyLink, editPost, handleDelete, isCommunityOwner } =
    usePostButtonHandlers({
      history,
      dispatch,
      post,
      setShowLinkCopied,
      isPage,
      setShowDeleteModal,
    });

  useEffect(() => {
    if (post.linkUrl && !metadata[post.linkUrl]) {
      fetchMetadata(post.linkUrl);
    }
  }, [post]);

  const metadataResult = metadata[post.linkUrl];

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
  }, [dispatch, id, showLinkCopied, commentNum, post?.commentNum]);

  return (
    <div
      className="classic-post-container"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          history.push(`/posts/${post?.id}`);
        }
      }}
    >
      <SinglePostVotingBtns post={post} />
      <div className="classic-post-main">
        <div className="classic-post-content-box">
          <div className="classic-post-content-img">
            {post?.imgUrl !== null && <img src={post?.imgUrl} alt="Post" />}
            {!post?.imgUrl && !post?.linkUrl && (
              <div className="classic-post-img-placeholder">
                <CgNotes />
              </div>
            )}
            {post?.linkUrl && (
              <div className="classic-post-img-placeholder">
                {metadataResult && (
                  <img
                    className="link-url-img"
                    src={metadataResult}
                    alt="Link preview"
                  />
                )}
                {!metadataResult && (
                  <span
                    className={`placeholder-link ${
                      isPage === "community" && "community-post"
                    }`}
                  >
                    <FiLink />
                  </span>
                )}
                <div
                  className={`placeholder-external ${
                    isPage === "community" && "community-post"
                  }`}
                >
                  <HiOutlineExternalLink />
                </div>
              </div>
            )}
          </div>
          <div className="classic-post-content-body">
            <div className="classic-post-content-body-top">
              <div className="classic-post-title">
                <h3>{post?.title}</h3>
                {post?.linkUrl && (
                  <div
                    className={`classic-post-link ${
                      isPage === "community" && "community-post"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      window.open(post?.linkUrl);
                      if (e.target.classList.contains("community-post"))
                        e.target.classList.remove("community-post");
                    }}
                  >
                    {sliceUrl(post?.linkUrl)} <HiOutlineExternalLink />
                  </div>
                )}
              </div>
            </div>
            <SinglePostAuthorBar
              format="Compact"
              community={isPage === "singlepage" || isPage === "community"}
              post={post}
            />
            <SinglePostButtonBar
              setPostExpand={setPostExpand}
              postExpand={postExpand}
              post={post}
              format="Compact"
            />
          </div>
        </div>
        {postExpand && <SinglePostExpanded post={post} />}
      </div>
    </div>
  );
}
