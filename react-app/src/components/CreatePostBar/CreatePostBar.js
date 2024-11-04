import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import "./CreatePostBar.css";

const PostBarButton = ({ icon: Icon, onClick, testId, ariaLabel }) => (
  <button aria-label={ariaLabel} onClick={onClick} data-testid={testId}>
    <Icon />
  </button>
);

export const CreatePostBar = ({ page, communityName }) => {
  const history = useHistory();
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser.id]);

  const navigate = (path) => () => history.push(path);

  const postBarButtons = [
    {
      icon: RxImage,
      navigation: navigate(
        page === "community"
          ? `/c/${communityName}/submit/image`
          : `/c/submit/image`
      ),
      testId: "image-post-icon",
      ariaLabel: "Create image post",
    },
    {
      icon: FiLink,
      navigation: navigate(
        page === "community"
          ? `/c/${communityName}/submit/url`
          : `/c/submit/url`
      ),
      testId: "url-post-icon",
      ariaLabel: "Create link post",
    },
  ];
  return (
    <>
      {user && (
        <div className="create-post-bar" data-testid="create-post-bar">
          <div className="user-img">
            <NavLink to={`/users/${user.id}/profile`}>
              <img src={user.profileImg} alt="User" />
            </NavLink>
          </div>

          <div className="create-post">
            <input
              type="text"
              placeholder="Create Post"
              onClick={navigate(
                page === "community" ? `/c/${communityName}/submit` : `/submit`
              )}
            />
          </div>

          {postBarButtons.map((btn) => (
            <PostBarButton
              key={uuidv4()}
              icon={btn.icon}
              onClick={btn.navigation}
              testId={btn.testId}
            />
          ))}
        </div>
      )}
    </>
  );
};
