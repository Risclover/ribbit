export const validateLinkPost = (community, title, linkUrl) => {
  let errors = [];
  if (!validator.isURL(linkUrl) && linkUrl.length > 0) {
    errors.push("Link doesn't look right.");
  }
  if (linkUrl.length === 0 || linkUrl === "" || linkUrl === null) {
    errors.push("Please enter a url.");
  }
  if (title.length <= 0) {
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
