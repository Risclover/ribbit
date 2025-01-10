import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import "./CreatePostBar.css";

/**
 * The post creation bar at the top of some of the post feeds (Homepage feed, 'All' feed, and community feeds).
 *
 * @param {boolean} isCommunityPage -
 * @param {string} communityName - Name of the community
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
            <PostBarBtn
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
