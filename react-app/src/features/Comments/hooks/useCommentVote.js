import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCommentVote, removeCommentVote, getUsers } from "@/store";

export function useCommentVote(commentId, comment) {
  const dispatch = useDispatch();
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);

  const handleUpvoteClick = async () => {
    if (comment?.commentVoters?.[comment?.userId]?.isUpvote) {
      await dispatch(removeCommentVote(commentId));
      setUpvote(false);
    } else {
      await dispatch(addCommentVote(commentId, "upvote"));
      setUpvote(true);
      setDownvote(false);
    }
    dispatch(getUsers());
  };

  const handleDownvoteClick = async () => {
    if (comment?.commentVoters?.[comment?.userId]?.isUpvote) {
      await dispatch(removeCommentVote(commentId));
      setDownvote(false);
    } else {
      await dispatch(addCommentVote(commentId, "downvote"));
      setDownvote(true);
      setUpvote(false);
    }
    dispatch(getUsers());
  };

  return { upvote, downvote, handleUpvoteClick, handleDownvoteClick };
}
