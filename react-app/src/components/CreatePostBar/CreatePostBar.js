import React from "react";
import { useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import styles from "./CreatePostBar.module.css";

const PostBarButton = ({ icon: Icon, onClick }) => (
  <button className={styles.iconButton} onClick={onClick}>
    <Icon />
  </button>
);

export const CreatePostBar = ({ page, communityName }) => {
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const navigate = (path) => () => history.push(path);

  return (
    <div className={styles.createPostBar}>
      {user && (
        <div className={styles.userImg}>
          <NavLink to={`/users/${user.id}/profile`}>
            <img src={user.profile_img} alt="User" />
          </NavLink>
        </div>
      )}

      <div className={styles.create}>
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
      />
      <PostBarButton
        icon={FiLink}
        onClick={navigate(
          page === "community"
            ? `/c/${communityName}/submit/url`
            : `/c/submit/url`
        )}
      />
    </div>
  );
};
