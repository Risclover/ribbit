import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUsers, getCommunities } from "@/store";
import { UserOwnedCommunities, UserAboutBox, UserProfilePosts } from "@/pages";
import { usePageSettings } from "@/hooks/usePageSettings";
import "./UserProfile.css";
import {
  FeedContainer,
  FeedLeftColContainer,
  FeedRightColContainer,
} from "@/layouts";
import { PostFormatContext } from "@/context";
import Skeleton from "@mui/material/Skeleton";
import { getUser } from "@/store";
import { useDarkMode } from "@/hooks";

export function UserProfile({ setOpenChat }) {
  const { theme } = useDarkMode();

  const dispatch = useDispatch();
  const { userId } = useParams();
  const { setFormat } = useContext(PostFormatContext);

  const [sortMode, setSortMode] = useState("new");

  const user = useSelector((state) => state.users[userId]);

  const communities = useSelector((state) => state.communities);
  const posts = useSelector((state) => Object.values(state.posts));
  const currentUser = useSelector((state) => state.session.user);

  const profilePosts = posts.filter((post) => post?.author?.id === +userId);

  useEffect(() => {
    if (posts.length === 0) dispatch(getPosts());
    if (Object.keys(communities).length === 0) dispatch(getCommunities());
    setFormat("Card");
  }, [dispatch]);

  usePageSettings({
    documentTitle: user
      ? user?.displayName + " (u/" + user?.username + ") - Ribbit"
      : "Ribbit - Splash into anything",
    icon:
      user !== undefined ? (
        <img
          src={user?.profileImg}
          className="nav-left-dropdown-item-icon item-icon-circle"
          alt="User"
        />
      ) : (
        <Skeleton
          variant="circular"
          animation="wave"
          width={20}
          height={20}
          sx={{ bgcolor: theme === "dark" && "grey.500" }}
        />
      ),
    pageTitle:
      user !== undefined ? (
        `u/${user?.username}`
      ) : (
        <Skeleton
          animation="wave"
          variant="text"
          sx={{ bgcolor: theme === "dark" && "grey.500" }}
        />
      ),
  });

  return (
    <FeedContainer>
      <FeedLeftColContainer>
        <UserProfilePosts
          posts={profilePosts}
          user={user}
          userId={userId}
          sortMode={sortMode}
          setSortMode={setSortMode}
        />
      </FeedLeftColContainer>
      <FeedRightColContainer>
        <UserAboutBox
          setOpenChat={setOpenChat}
          currentUser={currentUser}
          username={user?.username}
          user={user}
          userId={userId}
        />
        {currentUser?.id === +userId && (
          <UserOwnedCommunities
            communitiesList={Object.values(communities).filter(
              (community) => community.communityOwner.id === +userId
            )}
            userId={+userId}
          />
        )}
      </FeedRightColContainer>
    </FeedContainer>
  );
}
export default UserProfile;
