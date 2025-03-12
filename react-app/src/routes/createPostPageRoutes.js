export const createPostPageRoutes = [
  // Global
  { path: "/submit", val: "post" },
  { path: "/c/submit/image", val: "image" },
  { path: "/c/submit/url", val: "link" },

  // Community-based
  { path: "/c/:communityName/submit", val: "post" },
  { path: "/c/:communityName/submit/image", val: "image" },
  { path: "/c/:communityName/submit/url", val: "link" },
];
