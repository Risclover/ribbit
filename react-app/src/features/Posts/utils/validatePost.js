export const validatePost = (community, title) => {
  let errors = [];

  if (title.trim().length <= 0) {
    errors.push("Please include a title.");
  }
  if (community === undefined) {
    errors.push("Please select a community.");
  }

  if (errors.length > 0) {
    return errors;
  } else {
    return [];
  }
};
