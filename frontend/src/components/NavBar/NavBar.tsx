import {
  useMemo,
  useCallback,
  RefObject,
  MouseEvent as ReactMouseEvent,
} from "react";
import { NavLink } from "react-router-dom";
import {
  NavUserDropdown,
  NavLeftDropdownFace,
  LoggedOutDropdownWrapper,
} from ".";
import { useSelectedChat, useOpenChat, useAuthFlow } from "@/context";
import { Searchbar } from "@/features";
import { RandomLogo } from "../../layouts/RandomLogo";
import { NavBarBtns } from "./NavBarBtns";
import { useAppSelector, RootState } from "@/store";

import "./NavBar.css";
import "../../features/NewSearch/Search.css";

/* ----------  Types ---------- */

interface Thread {
  id: number;
  messages?: { id: number; createdAt: string; read: boolean }[];
  createdAt: string;
}

interface NavBarProps {
  setShowNavSidebar: (v: boolean) => void;
  showDropdown: boolean;
  setShowDropdown: (v: boolean) => void;
  searchbarRef: RefObject<HTMLInputElement>;
  setShowSearchScreen: (v: boolean) => void;
  showNavSidebar: boolean;
  minimizeChat: boolean;
  setMinimizeChat: (v: boolean) => void;
}

/* ----------  Local selectors  ---------- */

const selectThreads = (s: RootState) =>
  s.chatThreads.chatThreads as Record<string, Thread>;
const selectUser = (s: RootState) => s.session.user;
const selectNotifs = (s: RootState) => Object.values(s.notifications);
const selectMsgs = (s: RootState) => Object.values(s.messages);

export function NavBar({
  setShowNavSidebar,
  showDropdown,
  setShowDropdown,
  searchbarRef,
  setShowSearchScreen,
  showNavSidebar,
  minimizeChat,
  setMinimizeChat,
}: NavBarProps) {
  const { openLogin } = useAuthFlow();

  const { setSelectedChat } = useSelectedChat();
  const { openChat, setOpenChat } = useOpenChat();

  const chatThreads = useAppSelector(selectThreads);
  const user = useAppSelector(selectUser);
  const notifications = useAppSelector(selectNotifs);
  const messages = useAppSelector(selectMsgs);

  /* ----------  Derived data ---------- */

  // const { unreadTotal, unreadMsgs } = useMemo(() => {
  //   const unreadMsgs = messages.filter((m: any) => !m.read).length;

  //   const unreadNotifs = notifications.filter(
  //     (n: any) =>
  //       !n.read && n.senderId !== user?.id && n.notificationType !== "message"
  //   ).length;

  //   return { unreadTotal: unreadMsgs + unreadNotifs, unreadMsgs };
  // }, [messages, notifications, user]);

  const sortedThreads = useMemo(() => {
    return Object.values(chatThreads).sort((a: Thread, b: Thread) => {
      const aLast = a.messages?.at(-1);
      const bLast = b.messages?.at(-1);
      if (!aLast && !bLast) return a.createdAt.localeCompare(b.createdAt);
      if (!aLast) return 1;
      if (!bLast) return -1;
      return (
        new Date(bLast.createdAt).getTime() -
        new Date(aLast.createdAt).getTime()
      );
    });
  }, [chatThreads]);

  /* ----------  Handlers ---------- */

  const handleOpenChat = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();
      if (!sortedThreads.length) return;

      setSelectedChat(sortedThreads[0]);
      minimizeChat ? setMinimizeChat(false) : setOpenChat(!openChat);
    },
    [
      minimizeChat,
      setMinimizeChat,
      setOpenChat,
      openChat,
      setSelectedChat,
      sortedThreads,
    ]
  );

  /* ----------  Render ---------- */

  return (
    <nav className="navbar-nav">
      <ul>
        <li>
          <NavLink to="/" exact>
            <RandomLogo />
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLeftDropdownFace
              setShowNavSidebar={setShowNavSidebar}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              showNavSidebar={showNavSidebar}
            />
          </li>
        )}
      </ul>

      <Searchbar
        loggedIn={!!user}
        searchbarRef={searchbarRef}
        setShowSearchScreen={setShowSearchScreen}
      />

      <div className="navbar-right">
        {user ? (
          <>
            <NavBarBtns handleOpenChat={handleOpenChat} />
            <NavUserDropdown />
          </>
        ) : (
          <>
            <button className="navbar-login-btn" onClick={openLogin}>
              Log In
            </button>
            <LoggedOutDropdownWrapper />
          </>
        )}
      </div>
    </nav>
  );
}
