import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeCommentVote, addCommentVote, getComments } from "@/store";

/**
 * Hook for upvote/downvote logic on a single comment.
 */
export const useCommentVote = (comment) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [vote, setVote] = useState(null);

  useEffect(() => {
    const voter = comment?.commentVoters?.[user?.id];
    if (voter) {
      setVote(voter.isUpvote ? "upvote" : "downvote");
    } else {
      setVote(null);
    }
  }, [user?.id, comment]);

  const handleVoteClick = async (e, voteType) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      history.push("/login");
      return;
    }

    if (vote === voteType) {
      await dispatch(removeCommentVote(comment.id));
      setVote(null);
    } else {
      await dispatch(addCommentVote(comment.id, voteType));
      setVote(voteType);
    }

    dispatch(getComments(comment.postId));
  };

  return { vote, handleVoteClick };
};
