import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, getPosts } from "../../../store/posts";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import "./PostForm.css";
import DiscardPost from "../../Modals/DiscardPost";
import { getCommunities } from "../../../store/communities";
import ImagePostForm from "../ImagePost/ImagePostForm";
import { addImagePost } from "../../../store/posts";

export default function CreatePost({ loadedCommunity }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { communityId } = useParams();
  console.log("LOCATION:", location.state);
  const [title, setTitle] = useState("");
  const [img_url, setimg_url] = useState("");
  const [content, setContent] = useState("");
  const [community_id, setcommunity_id] = useState(communityId);
  const [disabled, setDisabled] = useState(false);
  const [imgDisabled, setImgDisabled] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);

  const [errors, setErrors] = useState([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [postType, setPostType] = useState("post");
  const history = useHistory();
  const communities = useSelector((state) => Object.values(state.communities));
  const user = useSelector((state) => state.session.user);

  console.log("COMMUNITY ID", community_id);
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    console.log("TITLE:", title);
    console.log("CONTENT:", content);
    console.log("COMMUNITY ID:", community_id);
    if (
      (postType === "post" && content.length === 0) ||
      (postType === "image" && img_url === undefined) ||
      title.length === 0 ||
      community_id === undefined ||
      community_id === "undefined"
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
  }, [dispatch, title, content, community_id, img_url]);

  const handlePostSubmit = (e) => {
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

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    const data = dispatch(addImagePost({ title, img_url, community_id }));

    console.log("DATA", data);
    history.push(`/c/${+communityId}`);
  };

  const handlePostTypeChange = (e, type) => {
    e.preventDefault();
    setPostType(type);
  };

  const handleDeletePreview = (e) => {
    e.preventDefault();
    setimg_url(undefined);
  };

  return (
    <div className="create-post-form-container">
      {user && (
        // <ImagePost />
        <form
          className="create-post-form"
          onSubmit={
            postType === "post"
              ? handlePostSubmit
              : postType === "image"
              ? handleImageSubmit
              : ""
          }
        >
          <div className="create-post-header">Create a post</div>
          <div className="create-post-choose-community">
            <select
              defaultValue={"undefined"}
              onChange={(e) => setcommunity_id(e.target.value)}
              value={community_id}
              className="choose-community-dropdown"
            >
              <option value={"undefined"} disabled>
                Choose a community
              </option>
              {communityId === "undefined" &&
                communities.length > 0 &&
                communities.map(
                  (community) =>
                    community.subscribers[user?.id] !== undefined && (
                      <option value={community.id}>c/{community.name}</option>
                    )
                )}
              {communityId !== "undefined" &&
                communities.length > 0 &&
                communities.map(
                  (community) =>
                    community.id === +communityId && (
                      <option value={community.id}>c/{community.name}</option>
                    )
                )}
            </select>
          </div>
          <div className="create-post-content">
            <div className="post-type-bar">
              <button
                className={
                  postType === "image"
                    ? "post-type-post"
                    : "post-type-post active-type"
                }
                onClick={(e) => handlePostTypeChange(e, "post")}
              >
                <i className="fa-regular fa-file-lines"></i> Post
              </button>
              <button
                className={
                  postType === "image"
                    ? "post-type-post active-type"
                    : "post-type-post"
                }
                onClick={(e) => handlePostTypeChange(e, "image")}
              >
                <i className="fa-regular fa-image"></i> Image
              </button>
            </div>
            <div className="create-post-form-inputs">
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
              {postType === "post" && (
                <div className="create-post-form-input">
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    className="create-post-input content-input"
                    value={content}
                    maxLength={40000}
                    placeholder="Text"
                  ></textarea>
                </div>
              )}
              {postType === "image" && (
                <div className="image-post-box">
                  {!img_url && (
                    <button
                      className="image-post-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowImgModal(true);
                      }}
                    >
                      Upload
                    </button>
                  )}
                  {img_url && (
                    <div
                      className="image-post-preview-box"
                      onClick={() => setShowImgModal(true)}
                    >
                      <div
                        className="image-preview-box"
                        style={{
                          backgroundImage: `url(${img_url}`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        <button
                          className="close-preview-btn"
                          onClick={handleDeletePreview}
                        >
                          <i className="fa-solid fa-circle-xmark close-preview-img"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {showImgModal && (
                <Modal onClose={() => setShowImgModal(false)}>
                  <ImagePostForm
                    setShowImgModal={setShowImgModal}
                    setimg_url={setimg_url}
                    img_url={img_url}
                  />
                </Modal>
              )}
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
                    content.length > 0 && postType === "post"
                      ? setShowDiscardModal(true)
                      : history.push("/home");
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
          </div>
        </form>
      )}
    </div>
  );
}
