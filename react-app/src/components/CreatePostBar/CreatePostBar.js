import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import "./CreatePostBar.css";

const PostBarButton = ({ icon: Icon, onClick, testId }) => (
  <button onClick={onClick} data-testid={testId}>
    <Icon />
  </button>
);

export const CreatePostBar = ({ page, communityName }) => {
  const history = useHistory();
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser.id]);

  const navigate = (path) => () => history.push(path);

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

          <PostBarButton
            icon={RxImage}
            onClick={navigate(
              page === "community"
                ? `/c/${communityName}/submit/image`
                : `/c/submit/image`
            )}
            testId="image-post-icon"
          />
          <PostBarButton
            icon={FiLink}
            onClick={navigate(
              page === "community"
                ? `/c/${communityName}/submit/url`
                : `/c/submit/url`
            )}
            testId="url-post-icon"
          />
        </div>
      )}
    </>
  );
};
