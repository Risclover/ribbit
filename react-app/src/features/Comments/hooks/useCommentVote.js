import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeCommentVote, addCommentVote, getComments } from "@/store";

export const useCommentVote = (comment) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [vote, setVote] = useState(null);

  useEffect(() => {
    const voter = comment?.commentVoters[user?.id];

    if (voter) {
      setVote(voter.isUpvote ? "upvote" : "downvote");
    }
  }, [user?.id, comment]);

  const handleVoteClick = async (e, voteType) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      history.push("/login");
      return;
    }

    const currentVote = comment?.commentVoters[user?.id];

    if (vote === voteType) {
      // If the user is clicking the same vote type, remove the vote
      await dispatch(removeCommentVote(comment?.id));
      setVote(null);
    } else {
      // Change the vote by sending a single request
      await dispatch(addCommentVote(comment?.id, voteType));
      setVote(voteType);
    }

    dispatch(getComments(comment?.postId));
  };

  return { vote, handleVoteClick };
};
