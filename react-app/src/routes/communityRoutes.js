import { EditCommunity, PreviewCommunity } from "features";
import { CommunityPage, ImagePage } from "pages";

export const communityRoutes = [
  {
    path: "/c/:communityName",
    exact: true,
    component: CommunityPage,
  },
  {
    path: "/c/:communityName/style",
    exact: true,
    component: PreviewCommunity,
  },
  {
    path: "/c/:communityName/edit",
    exact: true,
    component: EditCommunity,
  },
  {
    path: "/c/:communityName/media",
    exact: false,
    component: ImagePage,
  },
];
