export function buildNestedComments(commentsArray) {
  const commentMap = {};
  commentsArray.forEach((c) => {
    commentMap[c.id] = { ...c, children: [] };
  });

  const nested = [];
  commentsArray.forEach((c) => {
    if (c.parentId) {
      // If parent is found, push to parent's children
      if (commentMap[c.parentId]) {
        commentMap[c.parentId].children.push(commentMap[c.id]);
      } else {
        // If the parent doesn't exist in map, treat as top-level
        nested.push(commentMap[c.id]);
      }
    } else {
      nested.push(commentMap[c.id]);
    }
  });

  return nested;
}
