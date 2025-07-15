import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { useHistory } from "react-router-dom";
import { addPostVote, getUsers, removePostVote } from "@/store";

export const usePostVote = (post) => {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.session.user);
  const [vote, setVote] = useState(null);

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

    // If the vote type is the same, remove the vote
    if (vote === voteType) {
      await dispatch(removePostVote(post?.id));
      setVote(null);
    } else {
      // Change the vote by sending a single request
      await dispatch(addPostVote(post?.id, voteType));
      setVote(voteType);
    }

    dispatch(getUsers());
  };

  return { vote, handleVoteClick };
};
