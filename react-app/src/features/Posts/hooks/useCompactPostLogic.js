import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  addPostVote,
  deletePost,
  getPosts,
  getUsers,
  getViewedPosts,
  removePostVote,
} from "@/store";

export const useCompactPostLogic = (post, isPage) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [vote, setVote] = useState(null);
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postExpand, setPostExpand] = useState(false);
  const [commentNum, setCommentNum] = useState(post?.commentNum);

  useEffect(() => {
    const voter = post?.postVoters[user?.id];
    if (voter) {
      setVote(voter.isUpvote ? "upvote" : "downvote");
    }
  }, [user?.id, post]);

  const handleVoteClick = async (e, voteType) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      history.push("/login");
      return;
    }

    const currentVote = post?.postVoters[user?.id];

    if (vote === voteType) {
      await dispatch(removePostVote(post?.id));
      setVote(null);
    } else {
      if (currentVote) {
        await dispatch(removePostVote(post?.id));
      }

      await dispatch(addPostVote(post?.id, voteType));
      setVote(voteType);
    }

    dispatch(getUsers());
  };

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

  return {};
};
