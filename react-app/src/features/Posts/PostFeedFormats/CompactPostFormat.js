import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import parse from "html-react-parser";
import cutLink from "../SinglePost/SliceUrl";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { HiOutlineExternalLink } from "react-icons/hi";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { addPostVote, removePostVote } from "../../../store/posts";
import { Modal } from "../../../context/Modal";
import DeleteConfirmation from "../../../components/Modals/DeleteConfirmation";
import Bounce from "../../../images/misc/curved-arrow.png";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import { getUsers } from "../../../store/users";
import HandleClickOutside from "../../../components/HandleClickOutside";
import "../SinglePost/SinglePost.css";
import "./ClassicPostFormat.css";
import "./CompactPostFormat.css";

export default function CompactPostFormat({ id, isPage, userId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);

  const post = useSelector((state) => state.posts[id]);
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

  useEffect(() => {
    document.addEventListener("mousedown", function (e) {
      HandleClickOutside(e, wrapperRef, showSubmenu, setShowSubmenu);
    });
    return () => {
      document.removeEventListener("mousedown", function (e) {
        HandleClickOutside(e, wrapperRef, showSubmenu, setShowSubmenu);
      });
    };
  }, [wrapperRef, showSubmenu]);

  const handleUpvoteClick = async (e) => {
    e.preventDefault();
    if (user?.id in post?.postVoters) {
      if (!post?.postVoters[user?.id].isUpvote) {
        await dispatch(removePostVote(post.id));
        await dispatch(addPostVote(post.id, "upvote"));
        dispatch(getUsers());
      } else if (upvote) {
        handleRemoveVote();
      } else {
        handleAddVote();
      }
    } else {
      handleAddVote();
    }
  };

  const handleDownvoteClick = async (e) => {
    e.preventDefault();
    if (user?.id in post?.postVoters) {
      if (post?.postVoters[user?.id].isUpvote) {
        await dispatch(removePostVote(post.id));
        await dispatch(addPostVote(post.id, "downvote"));
        dispatch(getUsers());
      } else if (downvote) {
        handleRemoveVote();
      }
    } else {
      handleAddDownvote();
    }
  };

  const handleAddVote = async (e) => {
    await dispatch(addPostVote(post.id, "upvote"));
    setUpvote(true);
    dispatch(getUsers());
  };

  const handleAddDownvote = async () => {
    await dispatch(addPostVote(post.id, "downvote"));
    setDownvote(true);
    dispatch(getUsers());
  };

  const handleRemoveVote = async () => {
    await dispatch(removePostVote(post.id));
    if (upvote) {
      setUpvote(false);
    }
    if (downvote) {
      setDownvote(false);
    }
    dispatch(getUsers());
  };

  useEffect(() => {
    if (Object.values(post?.postVoters).length > 0) {
      setVoted(true);
    } else {
      setVoted(false);
    }
  }, [post.postVoters]);

  useEffect(() => {
    if (
      Object.values(posts) &&
      post?.postVoters &&
      post?.postVoters !== undefined &&
      post?.postVoters !== null
    ) {
      if (Object.values(posts)?.length > 0) {
        if (Object.values(post?.postVoters)?.length > 0) {
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
        }
      }
    }
  }, [upvote, downvote, voteTotal, post?.postVoters, user?.id, posts]);

  return (
    <div className="post-compact-format">
      <div className="compact-post-container">
        <div className="compact-post-principle">
          <div className="compact-post-karmabar-alt">
            <div className="compact-post-karmabar-btns karmabar-alt">
              <button
                className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                onClick={(e) => {
                  e.preventDefault();
                  handleUpvoteClick(e);
                }}
              >
                <GoArrowUp />
              </button>
              <button
                className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
                onClick={(e) => {
                  e.preventDefault();
                  handleDownvoteClick(e);
                }}
              >
                <GoArrowDown />
              </button>
            </div>
          </div>
          <div className="compact-post-karmabar">
            <div className="compact-post-karmabar-btns">
              <button
                className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                onClick={(e) => {
                  e.preventDefault();
                  handleUpvoteClick(e);
                }}
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
                onClick={(e) => {
                  e.preventDefault();
                  handleDownvoteClick(e);
                }}
              >
                <GoArrowDown />
              </button>
            </div>
          </div>
          <div className="compact-post-main">
            <div className="compact-post-left">
              <div className="compact-post-icon">
                {post?.content !== null && (
                  <button
                    className="compact-post-icon-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPostExpand(!postExpand);
                    }}
                  >
                    <span className="compact-post-icon-btn-post">
                      <CgNotes />
                    </span>
                    <span className="compact-post-icon-btn-expand">
                      <BsArrowsAngleExpand />
                    </span>
                  </button>
                )}
                {post?.linkUrl !== null && (
                  <button
                    className="compact-post-icon-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(post.linkUrl);
                    }}
                  >
                    <HiOutlineExternalLink />
                  </button>
                )}
                {post?.imgUrl && (
                  <button
                    className="compact-post-icon-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      setPostExpand(!postExpand);
                    }}
                  >
                    <span className="compact-post-icon-btn-post">
                      <RxImage />
                    </span>
                    <span className="compact-post-icon-btn-expand">
                      <BsArrowsAngleExpand />
                    </span>
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
                        e.preventDefault();
                        window.open(post?.linkUrl);
                      }}
                    >
                      {cutLink(post?.linkUrl)} <HiOutlineExternalLink />
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
                  c/{post?.communityName} Posted by u/
                  {post?.postAuthor.username}
                </div>
                <div className="compact-post-author-bar">
                  {isPage !== "community" && (
                    <>
                      <span
                        className="compact-post-community"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/c/${post?.communityId}`);
                        }}
                      >
                        c/{post?.communityName}{" "}
                      </span>
                      <span className="single-post-dot-spacer">•</span>
                    </>
                  )}
                  Posted by
                  <span
                    className="compact-post-author"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/users/${post?.postAuthor.id}/profile`);
                    }}
                  >
                    u/{post?.postAuthor.username}
                  </span>
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
                        e.preventDefault();
                        setShowLinkCopied(true);
                        navigator.clipboard.writeText(
                          `https://ribbit-app.herokuapp.com/posts/${post.id}`
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
                            e.preventDefault();
                            history.push(`/posts/${post.id}/edit`);
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
                    {user && user.id === post.postAuthor.id && (
                      <button
                        className="compact-post-menu-btn"
                        onClick={(e) => {
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
                      >
                        <DeleteConfirmation
                          showDeleteModal={showDeleteModal}
                          setShowDeleteModal={setShowDeleteModal}
                          postId={post.id}
                          communityId={community?.id}
                          item="post"
                          post={post}
                          isPage={isPage}
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
            {post?.imgUrl && <img src={post.imgUrl} alt="Post" />}
            {post?.content && (
              <div
                className="compact-post-expanded-text"
                style={{ whiteSpace: "pre-line" }}
              >
                {parse(post.content)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
