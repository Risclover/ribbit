import {
  Inbox,
  Messages,
  Permalink,
  PostRepliesPage,
  Sent,
  Unread,
} from "@/features";

export const messageRoutes = [
  { path: "/message/messages", exact: true, component: Messages },
  { path: "/message/unread", exact: true, component: Unread },
  { path: "/message/sent", exact: true, component: Sent },
  { path: "/message/inbox", exact: true, component: Inbox },
  { path: "/message/selfreply", exact: true, component: PostRepliesPage },
  { path: "/message/messages/:threadId", exact: true, component: Permalink },
];
