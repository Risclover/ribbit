export function sortPostResults(posts, mode = "Top") {
  const comments = (p) => p.commentNum ?? p.comments?.length ?? 0;
  const timestamp = (p) => new Date(p.createdAt).getTime();

  // “controversy” → 1 when up = down, 0 when only ups or downs
  const getVoteCounts = (p) => {
    const voters = Object.values(p.postVoters ?? {});
    let up = 0;
    let down = 0;

    for (const v of voters) {
      if (v.isUpvote) up++;
      else down++;
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
    return total ? 1 - Math.abs(up - down) / total : 0; // 1 ↔ most controversial
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
