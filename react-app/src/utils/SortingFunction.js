export function SortingFunction(posts, sortMode) {
  return [...posts].sort((a, b) => {
    let postA = new Date(a.createdAt).getTime();
    let postB = new Date(b.createdAt).getTime();
    if (sortMode === "new") {
      return postB - postA;
    } else if (sortMode === "top") {
      return b.votes - a.votes || postB - postA;
    }
    return 0; // Ensure a consistent return for all paths
  });
}
