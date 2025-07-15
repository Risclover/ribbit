import {
  FC,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

import {
  useAppDispatch,
  useAppSelector,
  RootState,
  getPosts,
  getCommunities,
} from "@/store";

import { UserOwnedCommunities, UserProfilePosts } from "@/pages";

import {
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "@/layouts";

import { PostFormatContext } from "@/context";
import { usePageSettings } from "@/hooks/usePageSettings";
import { useDarkMode } from "@/hooks";

import { UserProfileMobile } from "./UserProfile/UserProfileMobile";
import { UserProfileAboutBox } from "features/Users/components/UserProfileAboutBox/UserProfileAboutBox";

/* ───────────────────────── Types ───────────────────────── */

type SortKey = "new" | "top" | string; // extend if you add more modes

type User = RootState["users"][number];
type Community = RootState["communities"][number];
type Post = RootState["posts"][number];

/* ───────────────────────── Component ───────────────────── */

export const UserProfilePage: FC = () => {
  const { theme } = useDarkMode();
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();

  /* --- global context --- */
  const { setFormat } = useContext(PostFormatContext);

  /* --- local UI state --- */
  const [sortMode, setSortMode] = useState<SortKey>("new");
  const [showAbout, setShowAbout] = useState<boolean>(false);

  /* --- store selectors --- */
  const user: User | undefined = useAppSelector((s) => s.users[Number(userId)]);
  const communities = useAppSelector((s) => s.communities);
  const posts = useAppSelector((s) => Object.values<Post>(s.posts));
  const currentUser = useAppSelector((s) => s.session.user);

  const profilePosts = posts.filter((p) => p?.author?.id === Number(userId));

  /* --- initial fetches / format init --- */
  useEffect(() => {
    if (posts.length === 0) dispatch(getPosts());
    if (Object.keys(communities).length === 0) dispatch(getCommunities());
    setFormat("Card"); // always Card on profile
  }, [dispatch, posts.length, communities, setFormat]);

  /* --- <head> meta + navbar state --- */
  usePageSettings({
    documentTitle: user
      ? `${user.displayName} (u/${user.username}) – Ribbit`
      : "Ribbit – Splash into anything",
    icon: user ? (
      <img
        src={user.profileImg}
        className="nav-left-dropdown-item-icon item-icon-circle"
        alt="User avatar"
      />
    ) : (
      <Skeleton
        animation="wave"
        variant="circular"
        width={20}
        height={20}
        sx={{ bgcolor: theme === "dark" && "grey.500" }}
      />
    ),
    pageTitle: user ? (
      `u/${user.username}`
    ) : (
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ bgcolor: theme === "dark" && "grey.500" }}
      />
    ),
  });

  /* ───────────────────── render ───────────────────── */

  return (
    <FeedContainer>
      <FeedLeftColContainer>
        <div className="user-profile-main">
          <UserProfilePosts
            posts={profilePosts}
            user={user}
            sortMode={sortMode}
            setSortMode={setSortMode as Dispatch<SetStateAction<SortKey>>}
          />
        </div>

        {/* Mobile variant */}
        <div className="user-profile-mobile">
          <UserProfileMobile
            showAbout={showAbout}
            setShowAbout={setShowAbout}
            communitiesList={Object.values(communities).filter(
              (c: Community) => c.communityOwner.id === Number(userId)
            )}
            posts={profilePosts}
            sortMode={sortMode}
            setSortMode={setSortMode as Dispatch<SetStateAction<SortKey>>}
          />
        </div>
      </FeedLeftColContainer>

      <FeedRightColContainer>
        <UserProfileAboutBox
          currentUser={currentUser}
          username={user?.username}
          user={user}
          showAbout={showAbout}
          setShowAbout={setShowAbout}
        />

        {currentUser?.id === Number(userId) && (
          <UserOwnedCommunities
            communitiesList={Object.values(communities).filter(
              (c: Community) => c.communityOwner.id === Number(userId)
            )}
            userId={Number(userId)}
          />
        )}
      </FeedRightColContainer>
    </FeedContainer>
  );
};

export default UserProfilePage;
