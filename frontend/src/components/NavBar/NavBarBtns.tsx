import { MouseEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import { TfiPlus } from "react-icons/tfi";
import { BsChatDots } from "react-icons/bs";
import { NotificationBell } from "@/features";
import { useAppSelector } from "@/store";
import { AllPostsIcon } from "@/assets";

interface NavBarBtnsProps {
  handleOpenChat: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function NavBarBtns({ handleOpenChat }: NavBarBtnsProps) {
  const history = useHistory();
  const user = useAppSelector((s) => s.session.user);
  const [showTooltip, setShowTooltip] = useState(false);

  /* Delay tooltip so accidental hovers don’t flash it */
  const showLater = () => setTimeout(() => setShowTooltip(true), 500);

  return (
    <div className="navbar-buttons">
      <button
        className="navbar-button"
        onClick={() => history.push("/all")}
        onMouseEnter={showLater}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AllPostsIcon />
        {showTooltip && <span className="navbtn-tooltiptext">/c/All</span>}
      </button>

      <button
        className="navbar-button"
        onMouseEnter={showLater}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={handleOpenChat}
      >
        <BsChatDots />
        {showTooltip && <span className="navbtn-tooltiptext">Chat</span>}
      </button>

      {user && (
        <div className="notification-wrapper">
          <NotificationBell />
        </div>
      )}

      <button
        className="navbar-button"
        onClick={() => history.push("/submit")}
        onMouseEnter={showLater}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <TfiPlus />
        {showTooltip && (
          <span className="navbtn-tooltiptext text2">Create Post</span>
        )}
      </button>
    </div>
  );
}
