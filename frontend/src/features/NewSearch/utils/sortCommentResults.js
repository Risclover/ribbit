// utils/sortComments.js
export function sortCommentResults(comments, mode = "Top") {
  /**
   * Figure out ↑ / ↓ from commentVoters, falling back to numeric props
   */
  const getVoteCounts = (c) => {
    if (c.commentVoters) {
      let up = 0,
        down = 0;
      for (const v of Object.values(c.commentVoters)) {
        v.isUpvote ? up++ : down++;
      }
      return { up, down };
    }
    // already denormalised in the object
    return { up: c.upvotes ?? 0, down: c.downvotes ?? 0 };
  };

  const score = (c) => {
    const { up, down } = getVoteCounts(c);
    return up - down;
  };

  const controversial = (c) => {
    const { up, down } = getVoteCounts(c);
    const total = up + down;
    return total ? 1 - Math.abs(up - down) / total : 0;
  };

  const created = (c) => new Date(c.createdAt).getTime();

  const compare =
    {
      Top: (a, b) => score(b) - score(a),
      Worst: (a, b) => score(a) - score(b),
      New: (a, b) => created(b) - created(a),
      Controversial: (a, b) => controversial(b) - controversial(a),
    }[mode] ?? (() => 0);

  return [...comments].sort(compare);
}
