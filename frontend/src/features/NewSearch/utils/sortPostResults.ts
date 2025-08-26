export function sortPostResults(
  posts,
  mode = "Top",
  postVotersById: Record<number, { userID: number; isUpvote: boolean }> = {}
) {
  const comments = (p) => p.commentNum ?? p.comments?.length ?? 0;
  const timestamp = (p) => new Date(p.createdAt).getTime();

  const getVoteCounts = (p) => {
    let up = 0;
    let down = 0;

    if (p.postVoterIds?.length) {
      for (const voterId of p.postVoterIds) {
        const voter = postVotersById[voterId];
        if (!voter) continue;
        if (voter.isUpvote) up++;
        else down++;
      }
    }

    return { up, down };
  };

  const score = (p) => {
    const { up, down } = getVoteCounts(p);
    return up - down;
  };

  const controversial = (p) => {
    const { up, down } = getVoteCounts(p);
    const total = up + down;
    return total ? 1 - Math.abs(up - down) / total : 0;
  };

  const compare =
    {
      Top: (a, b) => score(b) - score(a),
      Worst: (a, b) => score(a) - score(b),
      New: (a, b) => timestamp(b) - timestamp(a),
      Controversial: (a, b) => controversial(b) - controversial(a),
      "Most Comments": (a, b) => comments(b) - comments(a),
    }[mode] ?? (() => 0);

  return [...posts].sort(compare);
}
