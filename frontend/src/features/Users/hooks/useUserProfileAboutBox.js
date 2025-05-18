import { useCallback, useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFollowers,
  getUserFollowers,
  createChatThread,
  getUserChatThreads,
} from "@/store";
import { SelectedChatContext } from "@/context";
import { OpenChatContext } from "context/OpenChatContext";

/**
 * Business / side-effect layer for UserProfile “about” box.
 * No JSX, no class names — only data + handlers.
 */
export function useUserProfileAboutBox({ user, currentUser }) {
  const dispatch = useDispatch();
  const { setSelectedChat } = useContext(SelectedChatContext);
  const { setOpenChat } = useContext(OpenChatContext);

  /* ───────── local UI state ───────── */
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showBannerModal, setShowBannerModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  /* ───────── redux state ───────── */
  const followers = useSelector((s) => s.followers.followers);
  const follows = useSelector((s) => s.followers.follows);
  const threads = useSelector((s) => Object.values(s.chatThreads));

  /* ───────── derived flags / numbers ───────── */
  const isMe = currentUser?.id === user?.id;
  const isFollowing = !!(follows && user && follows[user.id]);
  const followersCount = Object.keys(followers || {}).length;

  /* ───────── initial data fetch ───────── */
  useEffect(() => {
    dispatch(getUserChatThreads());
    if (!followers.length) dispatch(getFollowers());
    if (user?.id) dispatch(getUserFollowers(user.id));
  }, [dispatch, user?.id]);

  /* ───────── handlers ───────── */

  /** Ensure DM thread exists, open chat window. */
  const startChat = useCallback(async () => {
    setOpenChat(true);

    const existing = threads.find(
      (t) =>
        t.users?.some((u) => u.id === currentUser?.id) &&
        t.users?.some((u) => u.id === user.id)
    );

    if (existing) {
      setSelectedChat(existing);
      return;
    }

    const newThread = await dispatch(createChatThread(user.id));
    setSelectedChat(newThread);
  }, [threads, currentUser?.id, user?.id, dispatch]);

  return {
    /* flags + counts */
    isMe,
    isFollowing,
    followersCount: followersCount,
    bannerImg: user?.bannerImg ?? "#0079d3",
    profileImg: user?.profileImg,
    karma: user?.karma ?? 0,

    /* UI state setters */
    showFollowersModal,
    setShowFollowersModal,
    showBannerModal,
    setShowBannerModal,
    showUploadModal,
    setShowUploadModal,
    showMobileMenu,
    setShowMobileMenu,

    /* event callbacks */
    startChat,
  };
}
