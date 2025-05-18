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

  const voter = comment?.commentVoters?.[user?.id]; // vote's user
  const vote = voter ? (voter.isUpvote ? "upvote" : "downvote") : null; // vote type

  const handleVoteClick = async (e, voteType) => {
    e.stopPropagation();
    e.preventDefault();

    /* If user isn't logged in, redirect to login form */
    if (!user) {
      history.push("/login");
      return;
    }

    if (vote === voteType) {
      /* If user clicks vote button that is already active, remove the vote */
      await dispatch(removeCommentVote(comment.id));
      setVote(null);
    } else {
      /* If not already active, add the vote */
      await dispatch(addCommentVote(comment.id, voteType));
      setVote(voteType);
    }
    /* Refresh comment data */
    dispatch(getComments(comment.postId));
  };

  return { vote, handleVoteClick };
};
