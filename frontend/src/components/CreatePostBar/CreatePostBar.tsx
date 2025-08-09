import { useHistory, NavLink } from "react-router-dom";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import { useAppSelector } from "@/store";
import { PostBarBtn } from "./PostBarBtn";
import "./CreatePostBar.css";

interface CreatePostBarProps {
  isCommunityPage?: boolean;
  communityName?: string;
}

export const CreatePostBar = ({
  isCommunityPage,
  communityName = "",
}: CreatePostBarProps) => {
  const history = useHistory();
  const cuser = useAppSelector((state: any) => state.session.user);
  const user = useAppSelector((state: any) => state.users.users[cuser?.id]);
  const navigate = (path: string) => () => history.push(path);

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

  return user ? (
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
            `${isCommunityPage ? "/c/" + communityName : ""}/submit`
          )}
          readOnly
        />
      </div>

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
  ) : null;
};
