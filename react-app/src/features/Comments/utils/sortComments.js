export const sortComments = (comments, sortType) => {
  return [...comments].sort((a, b) => {
    switch (sortType) {
      case "New":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "Old":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "Best":
        return b.upvotes - a.upvotes;
      case "Top":
        return b.votes - a.votes;
      default:
        return 0;
    }
  });
};
