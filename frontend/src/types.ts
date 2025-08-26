// ---------------- User ----------------
export type User = {
  id: number;
  username: string;
  displayName: string;
  email: string;
  about?: string | null;
  profileImg: string;
  bannerImg?: string | null;
  commentKarma: number;
  postKarma: number;
  karma: number;
  userPosts: number;
  unreadMsgs: number;
  createdAt: string;
};

// ---------------- Post ----------------
export type PostVoter = {
  createdAt: string;
  isUpvote: boolean;
  postID: number;
  userID: number;
};

export type PostAuthor = {
  id: number;
  username: string;
  img: string;
};

export type PostCommunity = {
  id: number;
  name: string;
  img: string;
};

export type Post = {
  id: number;
  title: string;
  content?: string | null;
  imgUrl?: string | null;
  linkUrl?: string | null;
  commentNum: number;
  votes: number;
  createdAt: string;
  updatedAt?: string;
  author: PostAuthor;
  community: PostCommunity;
  postVoterIds: Record<number, PostVoter>
};

// ---------------- Comment ----------------
export type CommentVoter = {
  commentId: number;
  createdAt: string;
  isUpvote: boolean;
  userId: number;
};

export type CommentAuthor = {
  id: number;
  username: string;
  profileImg: string;
};

export type Comment = {
  id: number;
  postId: number;
  parentId?: number | null;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  downvotes: number;
  votes: number;
  isDeleted: boolean;
  commentAuthor: CommentAuthor;
  commentVoters: Record<number, CommentVoter>;
  children: Comment[];
};

// ---------------- Community ----------------
export type CommunityOwner = User;
export type CommunityPost = Post;

export type CommunityRule = {
  id: number;
  communityId: number;
  title: string;
  description: string;
  createdAt: string;
};

export type CommunitySetting = {
  id: number;
  communityId: number;
  activeLinkColor: string;
  backgroundImg?: string | null;
  backgroundImgFormat: string;
  bannerColor: string;
  bannerHeight: string;
  bannerImg?: string | null;
  bannerImgFormat: string;
  baseColor: string;
  bgColor: string;
  communityIcon: string;
  customBannerColor: boolean;
  downvoteCountColor: string;
  downvoteImgActive?: string | null;
  downvoteImgInactive?: string | null;
  hideCommunityIcon: boolean;
  highlight: string;
  hoverBannerImg?: string | null;
  hoverLinkColor: string;
  inactiveLinkColor: string;
  linkPlaceholderImg?: string | null;
  linkPlaceholderImgFormat: string;
  menuBgColor: string;
  mobileBannerImg?: string | null;
  nameFormat: string;
  postBgColor: string;
  postBgImg?: string | null;
  postBgImgFormat: string;
  postTitleColor: string;
  secondaryBannerFormat: string;
  secondaryBannerImg?: string | null;
  submenuBgColor: string;
  upvoteCountColor: string;
  upvoteImgActive?: string | null;
  upvoteImgInactive?: string | null;
};

// Base type for DRY Community & Subscription
type CommunityBase = {
  id: number;
  name: string;
  displayName: string;
  description: string;
  members: number;
  createdAt: string;
  communityOwner: CommunityOwner;
  communityPosts: Record<number, CommunityPost>;
  communityRules: Record<number, CommunityRule>;
  communitySettings: Record<number, CommunitySetting>;
  subscribers: Record<number, User>;
};

export type Community = CommunityBase & { userId: number };
export type Subscription = CommunityBase & { userId: number };

// ---------------- Message / Chat ----------------
export type MessageUser = User;

export type Reaction = {
  id: number;
  type: string;
  userId: number;
  createdAt: string;
};

export type Message = {
  id: number;
  content: string;
  createdAt: string;
  read: boolean;
  threadId: number;
  sender: MessageUser;
  receiver: MessageUser;
  reactions: Reaction[];
};

export type ChatThread = {
  id: number;
  createdAt: string;
  updatedAt: string;
  hasUnread: boolean;
  users: MessageUser[];
  messages: Message[];
};

// ---------------- Favorites ----------------
export type FavoriteUsers = User[];
export type FavoriteCommunities = Community[];
