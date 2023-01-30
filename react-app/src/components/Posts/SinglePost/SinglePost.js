import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import moment from "moment";
import DeleteConfirmation from "../../Modals/DeleteConfirmation";
import "./SinglePost.css";
import UpdatePost from "../PostForms/UpdatePost";
import { NavLink } from "react-router-dom";
import { getComments } from "../../../store/comments";
import { getCommunities } from "../../../store/communities";
import { getCommunityPosts, getPosts } from "../../../store/posts";
import Bounce from "../../../images/curved-arrow.png";
import { getSinglePost } from "../../../store/one_post";
import { addPostVote, removePostVote } from "../../../store/posts";
// import Upvote from "../../../images/upvote.png";
// import Downvote from "../../../images/downvote.png";
// import UpvoteHover from "../../../images/upvote-red.png";
// import DownvoteHover from "../../../images/downvote-blue.png";
// import UpvoteSelected from "../../../images/upvote-selected.png";
// import DownvoteSelected from "../../../images/downvote-selected.png";

const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

function Text({ content }) {
  const words = content.split(" ");
  return (
    <p>
      {words.map((word) => {
        return word.match(URL_REGEX) ? (
          <>
            <a href={word}>{word}</a>{" "}
          </>
        ) : (
          word + " "
        );
      })}
    </p>
  );
}

export default function SinglePost({
  id,
  isPage,
  userId,
  commentsNum,
  setCommentsNum,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts[id]);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session.user);
  const community = useSelector(
    (state) => state.communities[post?.communityId]
  );
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [upvoteAllowed, setUpvoteAllowed] = useState(false);
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [voteTotal, setVoteTotal] = useState(0);
  const [commentNum, setCommentNum] = useState(0);
  // const [upvoteSrc, setUpvoteSrc] = useState(Upvote);
  // const [downvoteSrc, setDownvoteSrc] = useState(Downvote);

  useEffect(() => {
    dispatch(getCommunities());
    dispatch(getPosts());
    dispatch(getSinglePost(id));
    if (showLinkCopied) {
      setTimeout(() => {
        setShowLinkCopied(false);
      }, 3000);
    }
    setCommentNum(post.commentNum);
  }, [dispatch, id, showLinkCopied, commentNum, post.commentNum]);

  const displayLikes = (likes) => {
    const keys = Object.keys(likes);
    if (keys.length > 1 && user.id in likes) {
    }
  };

  const handleAddVote = async (e) => {
    await dispatch(addPostVote(post.id, "upvote"));
  };

  const handleAddDownvote = async () => {
    await dispatch(addPostVote(post.id, "downvote"));
  };

  const handleRemoveVote = async () => {
    await dispatch(removePostVote(post.id));
    if (upvote) {
      setUpvote(false);
      setVoteTotal(voteTotal - 1);
    }
    if (downvote) {
      setDownvote(false);
      setVoteTotal(voteTotal + 1);
    }
  };

  useEffect(() => {
    if (posts && Object.values(posts).length > 0) {
      if (Object.values(post?.postVoters).length > 0) {
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
        let votes = 0;
        for (let vote of Object.values(post?.postVoters)) {
          if (vote.isUpvote) {
            votes = votes + 1;
          } else if (!vote.isUpvote) {
            votes = votes - 1;
          }
        }
        setVoteTotal(votes);
      }
    }
  }, [upvote, downvote, voteTotal, post?.postVoters]);

  if (!post || !post.postVoters || !Object.values(post.postVoters)) return null;
  return (
    <>
      {post && (
        <div className="single-post-container">
          <div className="single-post-karmabar">
            <NavLink
              to={
                isPage === undefined
                  ? "/"
                  : isPage === "all"
                  ? "/c/all"
                  : isPage === "community"
                  ? `/c/${post.communityId}`
                  : isPage === "singlepage"
                  ? `/posts/${post.id}`
                  : isPage === "profile"
                  ? `/users/${userId}`
                  : ""
              }
            >
              {" "}
              <button
                className={upvote ? "vote-btn-red" : "upvote-btn-grey"}
                onClick={
                  user?.id in post?.postVoters
                    ? handleRemoveVote
                    : handleAddVote
                }
              >
                <i className="fa-regular fa-circle-up"></i>
              </button>
            </NavLink>

            <span className="karmabar-votes">{voteTotal}</span>
            <NavLink
              to={
                isPage === undefined
                  ? "/"
                  : isPage === "all"
                  ? "/c/all"
                  : isPage === "community"
                  ? `/c/${post.communityId}`
                  : isPage === "singlepage"
                  ? `/posts/${post.id}`
                  : isPage === "profile"
                  ? `/users/${userId}`
                  : ""
              }
            >
              <button
                className={downvote ? "vote-btn-blue" : "downvote-btn-grey"}
                onClick={
                  user?.id in post?.postVoters
                    ? handleRemoveVote
                    : handleAddDownvote
                }
              >
                <i className="fa-regular fa-circle-down"></i>
              </button>
            </NavLink>
          </div>
          <div className="single-post-main">
            <div className="single-post-author-bar">
              {isPage !== "community" && (
                <div className="single-post-community-info">
                  <div className="single-post-community-img">
                    <img src={community?.communityImg} />
                  </div>
                  <div className="single-post-community-name">
                    <NavLink to={`/c/${community?.id}`}>
                      c/{community?.name}
                    </NavLink>
                  </div>
                  <span className="single-post-dot-spacer">•</span>
                </div>
              )}

              <div className="single-post-author-info">
                Posted by{" "}
                <NavLink to={`/users/${post.postAuthor.id}`}>
                  u/{post.postAuthor.username}
                </NavLink>{" "}
                {moment(new Date(post.createdAt)).fromNow()}
              </div>
            </div>
            <div className="single-post-title-bar">{post.title}</div>
            {post.imgUrl ? (
              <div className="single-post-content-image">
                <img className="image-post-img" src={post.imgUrl} />
              </div>
            ) : (
              <>
                {isPage === "singlepage" ? (
                  <div
                    className="single-page-content"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <Text content={post.content} />
                  </div>
                ) : (
                  <div
                    className="single-post-content"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    <Text content={post.content} />
                  </div>
                )}
              </>
            )}

            <div className="single-post-button-bar">
              <div className="single-post-button">
                <button className="single-post-comments-btn">
                  <i className="fa-regular fa-message"></i>{" "}
                  <span className="single-post-comments-num">
                    {commentNum}{" "}
                    {Object.values(post.postComments).length === 1
                      ? "Comment"
                      : "Comments"}
                  </span>
                </button>
              </div>
              <div className="share-btn-stuff">
                <NavLink
                  to={
                    isPage === undefined
                      ? "/"
                      : isPage === "all"
                      ? "/c/all"
                      : isPage === "community"
                      ? `/c/${post.communityId}`
                      : isPage === "singlepage"
                      ? `/posts/${post.id}`
                      : isPage === "profile"
                      ? `/users/${userId}`
                      : ""
                  }
                >
                  <div className="single-post-button">
                    <button
                      className="single-post-share-btn"
                      onClick={() => {
                        setShowLinkCopied(true);
                        navigator.clipboard.writeText(
                          `https://ribbit-app.herokuapp.com/posts/${post.id}`
                        );
                      }}
                    >
                      <img src={Bounce} className="single-post-share-icon" />
                      Share
                    </button>
                  </div>
                </NavLink>

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
              {isPage === "singlepage" &&
              user &&
              user.id === post.postAuthor.id ? (
                <div className="logged-in-btns">
                  <div className="single-post-button">
                    <button
                      className="single-post-edit-btn"
                      onClick={() => history.push(`/posts/${post.id}/edit`)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                      Edit
                    </button>
                    {showEditModal && (
                      <Modal
                        onClose={() => setShowEditModal(false)}
                        title="Edit post"
                      >
                        <UpdatePost
                          setShowEditModal={setShowEditModal}
                          showEditModal={showEditModal}
                        />
                      </Modal>
                    )}
                  </div>
                  <div className="single-post-button">
                    <button
                      className="single-post-delete-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowDeleteModal(true);
                      }}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                      Delete
                    </button>
                    {showDeleteModal && (
                      <Modal
                        onClose={() => setShowDeleteModal(false)}
                        title="Delete post?"
                      >
                        <DeleteConfirmation
                          showDeleteModal={showDeleteModal}
                          setShowDeleteModal={setShowDeleteModal}
                          postId={post.id}
                          communityId={community.id}
                          item="post"
                          post={post}
                        />
                      </Modal>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
