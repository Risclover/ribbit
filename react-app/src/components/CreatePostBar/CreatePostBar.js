import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import "./CreatePostBar.css";

/**
 *
 * @param {string} param0
 * @returns
 */

const PostBarButton = ({ icon: Icon, onClick, testId, ariaLabel }) => (
  <button aria-label={ariaLabel} onClick={onClick} data-testid={testId}>
    <Icon />
  </button>
);

/**
 * The post creation bar at the top of the Homepage feed, All feed, and community page feeds.
 *
 * @param {Object} props
 * @param {boolean} props.isCommunityPage - Whether CreatePostBar is on a community page
 * @param {string} props.communityName - The name of the community that this is being linked from
 *
 * @example
 * <CreatePostBar isCommunityPage communityName="cats" />
 */

export const CreatePostBar = ({ isCommunityPage, communityName }) => {
  const history = useHistory();
  const cuser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.users[cuser?.id]);

  const navigate = (path) => () => history.push(path);

  const postBarButtons = [
    {
      icon: RxImage,
      navigation: navigate(
        `/c${isCommunityPage ? "/" + communityName : ""}/submit/image`
      ),
      testId: "image-post-icon",
      ariaLabel: "Create image post",
    },
    {
      icon: FiLink,
      navigation: navigate(
        `/c${isCommunityPage ? "/" + communityName : ""}/submit/url`
      ),
      testId: "url-post-icon",
      ariaLabel: "Create link post",
    },
  ];

  console.log("FiLink:", FiLink);

  return (
    <>
      {user && (
        <div className="create-post-bar" data-testid="create-post-bar">
          {/* Current user's profile image */}
          <div className="user-img">
            <NavLink to={`/users/${user.id}/profile`}>
              <img src={user.profileImg} alt="User" />
            </NavLink>
          </div>

          {/* Input box */}
          <div className="create-post">
            <input
              type="text"
              placeholder="Create Post"
              onClick={navigate(
                `${isCommunityPage ? "/c/" + communityName : ""}/submit`
              )}
            />
          </div>

          {/* Buttons for image and link post creation pages */}
          {postBarButtons.map((btn) => (
            <PostBarButton
              ariaLabel={btn.ariaLabel}
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
