export const validateImgPost = (community, title, imgUrl) => {
  let errors = [];
  if (imgUrl === "" || imgUrl === null || imgUrl === undefined) {
    errors.push("Select an image.");
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
