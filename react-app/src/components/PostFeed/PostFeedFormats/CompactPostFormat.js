import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import {
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsThreeDots,
} from "react-icons/bs";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";
import parse from "html-react-parser";
import moment from "moment";

import {
  addPostVote,
  removePostVote,
  getUsers,
  deletePost,
  getViewedPosts,
  getPosts,
} from "../../../store";

import Bounce from "../../../assets/images/misc/curved-arrow.png";
import { DeleteConfirmationModal, Username } from "../../../components";
import { Modal } from "../../../context";
import { sliceUrl, HandleClickOutside } from "../../../utils";
import "../../../features/Posts/SinglePost/SinglePost.css";
import "./ClassicPostFormat.css";
import "./CompactPostFormat.css";

export function CompactPostFormat({ id, isPage, post }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const posts = useSelector((state) => state.posts);
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );

  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [voteTotal, setVoteTotal] = useState(post?.votes);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(0);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [voted, setVoted] = useState();

  useEffect(() => {
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
    setCommentNum(post?.commentNum);
  }, [dispatch, id, showLinkCopied, commentNum, post?.commentNum]);

  const handleVoteClick = async (e, voteType) => {
    e.stopPropagation();
    e.preventDefault();
    if (!cuser) {
      history.push("/login");
    } else {
      if (user?.id in post?.postVoters) {
        if (voteType === "upvote") {
          if (!post?.postVoters[user?.id].isUpvote) {
            await dispatch(removePostVote(post?.id));
            await dispatch(addPostVote(post?.id, "upvote"));
          } else if (upvote) {
            handleRemoveVote();
          }
        } else if (voteType === "downvote") {
          if (post?.postVoters[user?.id].isUpvote) {
            await dispatch(removePostVote(post?.id));
            await dispatch(addPostVote(post?.id, "downvote"));
          } else if (downvote) {
            handleRemoveVote();
          }
        }
        dispatch(getUsers());
      } else {
        handleAddVote(voteType);
      }
    }
  };

  const handleAddVote = async (voteType) => {
    await dispatch(addPostVote(post?.id, voteType));
    if (voteType === "upvote") setUpvote(true);
    if (voteType === "downvote") setDownvote(true);
    dispatch(getUsers());
  };

  const handleRemoveVote = async () => {
    await dispatch(removePostVote(post?.id));
    if (upvote) {
      setUpvote(false);
    }
    if (downvote) {
      setDownvote(false);
    }
    dispatch(getUsers());
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", function (e) {
  //     HandleClickOutside(e, wrapperRef, showSubmenu, setShowSubmenu);
  //   });
  //   return () => {
  //     document.removeEventListener("mousedown", function (e) {
  //       HandleClickOutside(e, wrapperRef, showSubmenu, setShowSubmenu);
  //     });
  //   };
  // }, [wrapperRef, showSubmenu]);

  // const handleUpvoteClick = async (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (user?.id in post?.postVoters) {
  //     if (!post?.postVoters[user?.id].isUpvote) {
  //       await dispatch(removePostVote(post?.id));
  //       await dispatch(addPostVote(post?.id, "upvote"));
  //       dispatch(getUsers());
  //     } else if (upvote) {
  //       handleRemoveVote();
  //     } else {
  //       handleAddVote();
  //     }
  //   } else {
  //     handleAddVote();
  //   }
  // };

  // const handleDownvoteClick = async (e) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (user?.id in post?.postVoters) {
  //     if (post?.postVoters[user?.id].isUpvote) {
  //       await dispatch(removePostVote(post?.id));
  //       await dispatch(addPostVote(post?.id, "downvote"));
  //       dispatch(getUsers());
  //     } else if (downvote) {
  //       handleRemoveVote();
  //     }
  //   } else {
  //     handleAddDownvote();
  //   }
  // };

  // const handleAddVote = async () => {
  //   await dispatch(addPostVote(post?.id, "upvote"));
  //   setUpvote(true);
  //   setDownvote(false);
  //   dispatch(getUsers());
  // };

  // const handleAddDownvote = async () => {
  //   await dispatch(addPostVote(post?.id, "downvote"));
  //   setDownvote(true);
  //   setUpvote(false);
  //   dispatch(getUsers());
  // };

  // const handleRemoveVote = async () => {
  //   await dispatch(removePostVote(post?.id));
  //   if (upvote) {
  //     setUpvote(false);
  //   }
  //   if (downvote) {
  //     setDownvote(false);
  //   }
  //   dispatch(getUsers());
  // };

  useEffect(() => {
    if (post && Object.values(post?.postVoters).length > 0) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, [post?.postVoters]);

  useEffect(() => {
    setUpvote(false);
    setDownvote(false);
    if (posts) {
      if (
        Object.values(posts) &&
        post?.postVoters &&
        post?.postVoters !== undefined &&
        post?.postVoters !== null
      ) {
        if (Object.values(posts)?.length > 0) {
          if (Object.values(post?.postVoters)?.length > 0) {
            setVoted(true);
            for (let voter of Object.values(post?.postVoters)) {
              if (user?.id === voter?.userID) {
                if (voter.isUpvote) {
                  setUpvote(true);
                  setDownvote(false);
                } else if (!voter.isUpvote) {
                  setUpvote(false);
                  setDownvote(true);
                }
              }
            }
          } else {
            setVoted(false);
          }
        }
      }
    }
  }, [
    upvote,
    downvote,
    post?.postVoters,
    user?.id,
    posts,
    setDownvote,
    setUpvote,
  ]);

  const handleDelete = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(deletePost(post?.id));
    setShowDeleteModal(false);
    dispatch(getUsers());
    dispatch(getViewedPosts());
    dispatch(getPosts());

    if (isPage === "community") {
      history.push(`/c/${post?.communityName}`);
    } else {
      history.push("/c/all");
    }
  };

  if (post.content?.length > 0) {
    let parsed = parse(post.content);
    console.log("parsed:", parsed);
  }
  return (
    <div className="post-compact-format">
      <div className="compact-post-container">
        <div className="compact-post-principle">
          <div className="compact-post-karmabar-alt">
            <div className="compact-post-karmabar-btns karmabar-alt">
              <button
                className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                onClick={(e) => handleVoteClick(e, "upvote")}
              >
                <GoArrowUp />
              </button>
              <button
                className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
                onClick={(e) => handleVoteClick(e, "downvote")}
              >
                <GoArrowDown />
              </button>
            </div>
          </div>
          <div className="compact-post-karmabar">
            <div className="compact-post-karmabar-btns">
              <button
                className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                onClick={(e) => handleVoteClick(e, "upvote")}
              >
                <GoArrowUp />
              </button>
              <span className="karmabar-votes">
                {post?.votes === 0 && voted
                  ? 0
                  : post?.votes === 0 && !voted
                  ? "Vote"
                  : post?.votes}
              </span>
              <button
                className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
                onClick={(e) => handleVoteClick(e, "downvote")}
              >
                <GoArrowDown />
              </button>
            </div>
          </div>
          <div className="compact-post-main">
            <div className="compact-post-left">
              <div className="compact-post-icon">
                {post?.content === "" && post.linkUrl === null && (
                  <button className="compact-post-icon-btn expandless">
                    <span className="compact-post-icon-btn-post">
                      <CgNotes />
                    </span>
                  </button>
                )}
                {post?.content !== "" &&
                  post.linkUrl === null &&
                  post.imgUrl === null && (
                    <button
                      className="compact-post-icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        setPostExpand(!postExpand);
                      }}
                    >
                      {!postExpand && (
                        <span className="compact-post-icon-btn-post">
                          <CgNotes />
                        </span>
                      )}
                      {!postExpand && (
                        <span className="compact-post-icon-btn-expand">
                          <BsArrowsAngleExpand />
                        </span>
                      )}
                      {postExpand && (
                        <span className="compact-post-icon-btn-collapse">
                          <BsArrowsAngleContract />
                        </span>
                      )}
                    </button>
                  )}
                {post?.linkUrl !== null && (
                  <button
                    className="compact-post-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      window.open(post?.linkUrl);
                    }}
                  >
                    <HiOutlineExternalLink />
                  </button>
                )}
                {post?.imgUrl && (
                  <button
                    className="compact-post-icon-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setPostExpand(!postExpand);
                    }}
                  >
                    {!postExpand && (
                      <span className="compact-post-icon-btn-post">
                        <RxImage />
                      </span>
                    )}
                    {!postExpand && (
                      <span className="compact-post-icon-btn-expand">
                        <BsArrowsAngleExpand />
                      </span>
                    )}
                    {postExpand && (
                      <span className="compact-post-icon-btn-collapse">
                        <BsArrowsAngleContract />
                      </span>
                    )}
                  </button>
                )}
              </div>
              <div className="compact-post-details">
                <div className="compact-post-title">
                  {post?.title}{" "}
                  {post?.linkUrl && (
                    <div
                      className="classic-post-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open(post?.linkUrl);
                      }}
                    >
                      {sliceUrl(post?.linkUrl)} <HiOutlineExternalLink />
                    </div>
                  )}
                </div>
                <div className="compact-post-author-bar-alt">
                  {post?.votes === 1
                    ? post?.votes + " point"
                    : post?.votes + " points"}
                  <span className="single-post-dot-spacer">•</span>
                  {commentNum === 1
                    ? commentNum + " comment"
                    : commentNum + " comments"}
                  <span className="single-post-dot-spacer">•</span>
                  c/{post?.communityName} Posted by{" "}
                  <Username
                    community={community}
                    username={post?.postAuthor?.username}
                    user={post?.postAuthor}
                    source="singlepost"
                  />
                </div>
                <div className="compact-post-author-bar">
                  {isPage !== "community" && (
                    <>
                      <span
                        className="compact-post-community"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          history.push(`/c/${post?.communityName}`);
                        }}
                      >
                        c/{post?.communityName}{" "}
                      </span>
                      <span className="single-post-dot-spacer">•</span>
                    </>
                  )}
                  Posted by
                  <Username
                    community={community}
                    username={post?.postAuthor?.username}
                    user={post?.postAuthor}
                    source="singlepost"
                  />
                  {moment(post?.createdAt).fromNow()}
                </div>
              </div>
            </div>
            <div className="compact-post-btns">
              <button className="compact-post-comments">
                <i className="fa-regular fa-message"></i>
                {commentNum}
              </button>
              <div className="compact-post-menu-wrapper">
                <button
                  className="compact-post-menu-face"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setShowSubmenu(!showSubmenu);
                  }}
                >
                  <BsThreeDots />
                </button>
                {showSubmenu && (
                  <div className="compact-post-menu" ref={wrapperRef}>
                    <button
                      className="compact-post-menu-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setShowLinkCopied(true);
                        navigator.clipboard.writeText(
                          `https://ribbit-app.herokuapp.com/posts/${post?.id}`
                        );
                      }}
                    >
                      <div className="compact-post-menu-btn-icon">
                        <img src={Bounce} alt="Share" />
                      </div>
                      <div className="compact-post-menu-btn-title">Share</div>
                    </button>
                    {user &&
                      user.id === post?.postAuthor.id &&
                      post?.imgUrl === null &&
                      post?.linkUrl === null && (
                        <button
                          className="compact-post-menu-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            history.push(`/posts/${post?.id}/edit`);
                          }}
                        >
                          <div className="compact-post-menu-btn-icon">
                            <i className="fa-solid fa-pencil"></i>
                          </div>
                          <div className="compact-post-menu-btn-title">
                            Edit
                          </div>
                        </button>
                      )}
                    {user && user.id === post?.postAuthor.id && (
                      <button
                        className="compact-post-menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setShowDeleteModal(true);
                        }}
                      >
                        <div className="compact-post-menu-btn-icon">
                          <i className="fa-regular fa-trash-can"></i>
                        </div>
                        <div className="compact-post-menu-btn-title">
                          Delete
                        </div>
                      </button>
                    )}
                    {showDeleteModal && (
                      <Modal
                        onClose={() => setShowDeleteModal(false)}
                        title="Delete post?"
                        open={() => setShowDeleteModal(true)}
                      >
                        <DeleteConfirmationModal
                          showDeleteModal={showDeleteModal}
                          setShowDeleteModal={setShowDeleteModal}
                          postId={post?.id}
                          communityId={community?.id}
                          item="post"
                          post={post}
                          isPage={isPage}
                          handleDelete={handleDelete}
                        />
                      </Modal>
                    )}
                  </div>
                )}
                {showLinkCopied && (
                  <div
                    className={
                      showLinkCopied
                        ? "animate-mount tooltiptext"
                        : "animate-unmount tooltiptext"
                    }
                  >
                    Link Copied to Clipboard
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {postExpand && (
          <div className="compact-post-expanded">
            {post?.imgUrl && <img src={post?.imgUrl} alt="Post" />}
            {post?.content && (
              <div
                className="compact-post-expanded-text"
                style={{ whiteSpace: "pre-line" }}
              >
                {parse(post?.content)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
