import { useEffect, useMemo, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CommunityImg } from "@/components/CommunityImg";
import { useAuthFlow } from "@/context/AuthFlowContext";
import { getCommunities } from "@/store";
import { AllPostsIcon } from "@/assets";
import "./NavSidebar.css";

/* -------- types -------------------------------------------------------- */

interface Community {
  id: number;
  name: string;
  members: number;
  communitySettings: Record<
    number,
    {
      communityIcon: string;
      communityBanner?: string;
    }
  >;
}

interface LoggedOutSidebarProps {
  showLoggedOutSidebar: boolean;
}

/* ---------------------------------------------------------------------- */

export function LoggedOutSidebar({
  showLoggedOutSidebar,
}: LoggedOutSidebarProps) {
  const { pathname } = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { openSignupPage1 } = useAuthFlow();

  const user = useAppSelector((s) => s.session.user);
  const communities = useAppSelector(
    (s) => Object.values(s.communities.communities) as Community[]
  );
  const communitiesLoaded = useAppSelector((state) => state.communities.loaded);

  /* ---- derived ------------------------------------------------------- */

  const sortedCommunities = useMemo(
    () => [...communities].sort((a, b) => b.members - a.members).slice(0, 5),
    [communities]
  );

  const [recent, setRecent] = useState<
    { id: number; name: string; icon: string; iconBgColor?: string }[]
  >([]);

  /* ---- effects ------------------------------------------------------- */

  // fetch popular communities once
  useEffect(() => {
    if (!communitiesLoaded) dispatch(getCommunities());
  }, [dispatch, communitiesLoaded]);

  // read “recent communities” from localStorage
  useEffect(() => {
    if (user) {
      setRecent([]);
      return;
    }

    const stored =
      (JSON.parse(
        localStorage.getItem("recentCommunities") || "[]"
      ) as typeof recent) ?? [];
    const cleaned = stored.filter((c) => c && c.id && c.name && c.icon);
    setRecent(cleaned);
  }, [user, pathname]);

  /* ---- early-out ---- */

  if (!showLoggedOutSidebar) return null;

  /* ---- render --------------------------------------------------------- */

  return (
    <aside className="logged-out-sidebar">
      <div className="logged-out-sidebar-top">
        {/* Feeds */}
        <section className="logged-out-sidebar-section">
          <h3 className="nav-left-dropdown-title">Feeds</h3>
          <NavLink to="/all" className="nav-left-dropdown-navitem">
            <AllPostsIcon />
            <span className="nav-left-dropdown-item">All</span>
          </NavLink>
        </section>

        <hr className="logged-out-sidebar-hr" />

        {/* Popular communities */}
        <section className="logged-out-sidebar-section">
          <h3 className="nav-left-dropdown-title">Popular Communities</h3>
          <ul className="logged-out-communities">
            {sortedCommunities.map((c) => (
              <li key={c.id}>
                <NavLink
                  to={`/c/${c.name}`}
                  className="nav-left-dropdown-navitem"
                >
                  <img
                    className="nav-left-dropdown-item-img"
                    alt="Community icon"
                    src={c.communitySettings[c.id]?.communityIcon}
                  />
                  <span className="nav-left-dropdown-item">c/{c.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent */}
        {recent.length > 0 && (
          <>
            <hr className="logged-out-sidebar-hr" />
            <section className="logged-out-sidebar-section">
              <h3 className="nav-left-dropdown-title">Recent</h3>
              <ul>
                {recent.map((comm) => (
                  <li key={comm.id}>
                    <NavLink
                      to={`/c/${comm.name}`}
                      className="nav-left-dropdown-navitem"
                    >
                      <CommunityImg
                        imgSrc={comm.icon}
                        imgClass="nav-left-dropdown-item-img"
                        imgAlt="Community icon"
                        imgStyle={{ backgroundColor: comm.iconBgColor }}
                      />
                      <span className="nav-left-dropdown-item">
                        c/{comm.name}
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>

      {/* CTA */}
      <div className="logged-out-sidebar-bottom">
        <p className="logged-out-sidebar-text">
          Create an account to follow your favorite communities and start taking
          part in conversations.
        </p>
        <button className="logged-out-sidebar-btn" onClick={openSignupPage1}>
          Join Ribbit
        </button>
      </div>
    </aside>
  );
}
