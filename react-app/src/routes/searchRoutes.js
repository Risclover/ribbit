import {
  SearchResultsComments,
  SearchResultsCommunities,
  SearchResultsPosts,
  SearchResultsUsers,
} from "@/features";

export const searchRoutes = [
  { path: "/search/comments", component: SearchResultsComments },
  { path: "/search/posts", component: SearchResultsPosts },
  { path: "/search/communities", component: SearchResultsCommunities },
  { path: "/search/users", component: SearchResultsUsers },
];
