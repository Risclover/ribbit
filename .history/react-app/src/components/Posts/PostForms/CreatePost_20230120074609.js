import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../../store/posts";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import "./PostForm.css";
import DiscardPost from "../../Modals/DiscardPost";
import { getCommunities } from "../../../store/communities";

export default function CreatePost({ loadedCommunity }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { communityId } = useParams();
  console.log("LOCATION:", location.state);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [community_id, setcommunity_id] = useState(communityId);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const history = useHistory();
  const communities = useSelector((state) => Object.values(state.communities));
  const user = useSelector((state) => state.session.user);

  console.log("COMMUNITY ID", communityId);
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    // REMEMBER: If no community, also set it to disabled.
    if (
      title.length === 0 ||
      content.length === 0 ||
      community_id === undefined
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    for (let community of communities) {
      if (community.id === communityId) {
        setcommunity_id(community.id);
      }
    }
  }, [dispatch, title, content, community_id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = dispatch(addPost({ title, content, community_id }));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setTitle("");
      setContent("");
      history.push(`/c/${community_id}`);
    }
  };

  return (
    <div className="create-post-form-container">
      {user && (
        <form className="create-post-form" onSubmit={handleSubmit}>
          <div className="create-post-header">Create a post</div>
          <div className="create-post-choose-community">
            <select
              defaultValue={undefined}
              onChange={(e) => setcommunity_id(e.target.value)}
              value={community_id}
              className="choose-community-dropdown"
            >
              <option value={undefined} disabled>
                Choose a community
              </option>
              {communityId === undefined &&
                communities.length > 0 &&
                communities.map(
                  (community) =>
                    community.subscribers[user?.id] !== undefined && (
                      <option value={community.id}>c/{community.name}</option>
                    )
                )}
              {communityId !== undefined &&
                communities.length > 0 &&
                communities.map((community) => (
                  <option value={community.id}>c/{community.name}</option>
                ))}
            </select>
          </div>
          <div className="create-post-content">
            <div className="create-post-form-input">
              <textarea
                placeholder="Title"
                className="create-post-input title-input"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                maxLength={300}
              ></textarea>
              <div className="create-post-form-title-length">
                <span className="create-post-title-length">
                  {title.length}/300
                </span>
              </div>
            </div>
            <div className="create-post-form-input">
              <textarea
                onChange={(e) => setContent(e.target.value)}
                className="create-post-input content-input"
                value={content}
                maxLength={40000}
                placeholder="Text"
              ></textarea>
            </div>
            <div className="create-post-form-errors">
              {errors && errors.length > 0
                ? errors.map((error) => <div>{error}</div>)
                : ""}
            </div>
            <div className="create-post-form-buttons">
              <button
                className="create-post-form-cancel"
                onClick={(e) => {
                  e.preventDefault();
                  content.length > 0
                    ? setShowDiscardModal(true)
                    : history.push("/posts");
                }}
              >
                Cancel
              </button>
              {showDiscardModal && (
                <Modal
                  title="Discard post?"
                  onClose={() => setShowDiscardModal(false)}
                >
                  <DiscardPost
                    setShowDiscardModal={setShowDiscardModal}
                    showDiscardModal={showDiscardModal}
                  />
                </Modal>
              )}
              <button
                disabled={disabled}
                type="submit"
                className="create-post-form-submit"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
