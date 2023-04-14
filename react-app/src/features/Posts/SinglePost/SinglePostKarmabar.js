import React, { useEffect, useState } from "react";
import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { addPostVote, removePostVote } from "../../../store/posts";
import { getUsers } from "../../../store/users";
import { useHistory } from "react-router-dom";

export default function SinglePostKarmabar({
  upvote,
  downvote,
  post,
  setUpvote,
  setDownvote,
  setShowLoginForm,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);
  const currentUser = useSelector((state) => state.session.user);
  const posts = useSelector((state) => state.posts);

  const [voted, setVoted] = useState(false);

  useEffect(() => {
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
  }, [upvote, downvote, post?.postVoters, user?.id]);

  const handleVoteClick = async (e, voteType) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLoginForm(true);
      history.push("/login");
    } else {
      if (user?.id in post?.postVoters) {
        if (voteType === "upvote") {
          if (!post?.postVoters[user?.id].isUpvote) {
            await dispatch(removePostVote(post.id));
            await dispatch(addPostVote(post.id, "upvote"));
          } else if (upvote) {
            handleRemoveVote();
          }
        } else if (voteType === "downvote") {
          if (post?.postVoters[user?.id].isUpvote) {
            await dispatch(removePostVote(post.id));
            await dispatch(addPostVote(post.id, "downvote"));
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
    await dispatch(addPostVote(post.id, voteType));
    if (voteType === "upvote") setUpvote(true);
    if (voteType === "downvote") setDownvote(true);
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

  return (
    <div className="single-post-karmabar">
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
  );
}
