export const getPath = (base, page, communityName) => {
  if (page === "community") {
    return `/c/${communityName}/submit${base}`;
  } else {
    return `/submit${base}`;
  }
};
