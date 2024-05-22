import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import validator from "validator";
import { TfiPlus } from "react-icons/tfi";

import {
  addLinkPost,
  addPost,
  addPostVote,
  getPosts,
  addImagePost,
  getCommunities,
  getSubscriptions,
} from "@/store";

import { Modal } from "@/context";
import {
  CommunitySelection,
  PostTypeBar,
  RibbitRules,
  CommunityInfoBox,
  DiscardPost,
  CommunityRule,
  ImagePostForm,
  CommunityDetails,
  useAutosizeTextArea,
  CommunityRulesBox,
} from "../..";
import getTextColor from "@/utils/getTextColor";
import "./PostForm.css";
import { usePageSettings } from "@/hooks/usePageSettings";
import { getIdFromName } from "utils/getCommunityIdFromName";

const modules = {
  toolbar: [
    [
      "bold",
      "italic",
      "link",
      "strike",
      "code",
      { script: "super" },
      { header: 1 },
    ],
    [{ list: "bullet" }, { list: "ordered" }],
    ["blockquote", "code-block"],
  ],
};

export function CreatePost({ postType, setPostType, val }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { communityName } = useParams();

  const textareaRef = useRef(null);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getCommunities());
    dispatch(getSubscriptions());
  }, [dispatch]);

  const [link_url, setlink_url] = useState("");
  const [community, setCommunity] = useState();
  const [title, setTitle] = useState("");
  const [img_url, setimg_url] = useState("");
  const [content, setContent] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [linkErrors, setLinkErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [headerText, setHeaderText] = useState();

  const posts = useSelector((state) => Object.values(state.posts));
  const communities = useSelector((state) => state.communities);
  const user = useSelector((state) => state.session.user);

  const communityId = getIdFromName(communityName, communities);
  const [community_id, setcommunity_id] = useState(
    communityId === "undefined" ? "undefined" : +communityId
  );

  useAutosizeTextArea(textareaRef.current, title);

  usePageSettings({
    documentTitle: `Submit to ${community ? community?.name : "Ribbit"}`,
    icon: (
      <div className="nav-left-dropdown-item-icon">
        <TfiPlus />
      </div>
    ),
    pageTitle: "Create Post",
  });

  useEffect(() => {
    for (let community of Object.values(communities)) {
      if (community.id === community_id) {
        setCommunity(community);
      }
    }
  }, [community_id, communities]);

  useEffect(() => {
    setPostType(val);
  }, [val]);

  const postErrors = () => {
    let errors = [];

    if (title.trim().length <= 0) {
      errors.push("Please include a title.");
    }
    if (community === undefined) {
      errors.push("Please select a community.");
    }

    if (errors.length > 0) {
      setErrors(errors);
    } else {
      setErrors([]);
    }
  };

  const imgPostErrors = () => {
    let errors = [];
    if (img_url === "" || img_url === null || img_url === undefined) {
      errors.push("Select an image.");
    }
    if (title.length <= 0) {
      errors.push("Please include a title.");
    }
    if (community === undefined) {
      errors.push("Please select a community.");
    }

    if (errors.length > 0) {
      setImageErrors(errors);
    } else {
      setImageErrors([]);
    }
  };

  const linkPostErrors = () => {
    let errors = [];
    if (
      postType === "link" &&
      !validator.isURL(link_url) &&
      link_url.length > 0
    ) {
      errors.push("Link doesn't look right.");
    }
    if (link_url.length === 0 || link_url === "" || link_url === null) {
      errors.push("Please enter a url.");
    }
    if (title.length <= 0) {
      errors.push("Please include a title.");
    }
    if (community === undefined) {
      errors.push("Please select a community.");
    }

    if (errors.length > 0) {
      setLinkErrors(errors);
    } else {
      setLinkErrors([]);
    }
  };

  const findErrors = () => {
    linkPostErrors();
    imgPostErrors();
    postErrors();
  };

  useEffect(() => {
    if (content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setContent("");
      setDisabled(true);
    }

    if (
      (postType === "image" &&
        (img_url === "" || img_url === undefined || img_url === null)) ||
      (postType === "link" &&
        (link_url.length === 0 || !validator.isURL(link_url))) ||
      title.length === 0 ||
      community_id === undefined ||
      community_id === "undefined" ||
      isNaN(communityId)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

    for (let community of Object.values(communities)) {
      if (community.id === +communityId) {
        setcommunity_id(community.id);
      } else {
        setcommunity_id(+communityId);
      }
    }
  }, [
    dispatch,
    title,
    content,
    community_id,
    img_url,
    communities,
    communityId,
    postType,
    link_url,
  ]);

  useEffect(() => {
    if (content.trim() === 0) {
      setContent("");
    }
    console.log("content:", content);
  }, [content]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const data = dispatch(addPost({ title, content, community_id }));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setTitle("");
      setContent("");
      const postId = posts[posts?.length - 1]?.id + 1;
      history.push(`/c/${communityName}`);
      await dispatch(getPosts());
      dispatch(addPostVote(postId, "upvote"));
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    const postId = posts[posts.length - 1].id + 1;
    dispatch(addLinkPost({ title, link_url, community_id }));
    history.push(`/c/${communityName}`);
    await dispatch(getPosts());
    dispatch(addPostVote(postId, "upvote"));
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const postId = posts[posts.length - 1].id + 1;

    dispatch(addImagePost({ title, img_url, community_id }));
    history.push(`/c/${communityName}`);
    await dispatch(getPosts());
    dispatch(addPostVote(postId, "upvote"));
  };

  const handleDeletePreview = (e) => {
    e.preventDefault();
    setimg_url(undefined);
  };

  const cancelPost = (e) => {
    e.preventDefault();
    if (content.length > 0 && postType === "post") {
      setShowDiscardModal(true);
    } else {
      if (
        community_id !== undefined &&
        community_id !== "undefined" &&
        community_id &&
        !isNaN(community_id)
      ) {
        history.push(`/c/${communityName}`);
      } else {
        history.push("/home");
      }
    }
  };

  if (!communities) return null;

  return (
    <div className="create-post-page">
      <div className="create-post-page-left">
        {user && (
          <form
            className="create-post-form"
            onSubmit={
              postType === "post"
                ? handlePostSubmit
                : postType === "image"
                ? handleImageSubmit
                : postType === "link"
                ? handleLinkSubmit
                : ""
            }
          >
            <div className="create-post-header">Create a post</div>
            <CommunitySelection
              communityId={community_id}
              community={community}
              setCommunity={setCommunity}
              setCommunityId={setcommunity_id}
            />

            <div className="create-post-content">
              <PostTypeBar postType={postType} setPostType={setPostType} />
              <div className="create-post-form-inputs">
                <div className="create-post-form-input">
                  <textarea
                    ref={textareaRef}
                    placeholder="Title"
                    className="create-post-input title-input"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    maxLength={300}
                  ></textarea>
                  <div className="create-post-form-title-length">
                    <span className="create-post-title-length">
                      {title === "" || title === null || title.length === 0
                        ? 0
                        : title.length}
                      /300
                    </span>
                  </div>
                </div>
                {postType === "post" && (
                  <div className="create-post-form-input">
                    <ReactQuill
                      theme="snow"
                      modules={modules}
                      onChange={setContent}
                      placeholder="Text (required)"
                    />
                  </div>
                )}
                {postType === "image" && (
                  <div className="image-post-box">
                    {!img_url && (
                      <button
                        className="blue-btn-unfilled btn-short"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowImgModal(true);
                        }}
                      >
                        Choose Image
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
                  <Modal
                    onClose={() => setShowImgModal(false)}
                    open={() => setShowImgModal(true)}
                  >
                    <ImagePostForm
                      setShowImgModal={setShowImgModal}
                      setimg_url={setimg_url}
                      img_url={img_url}
                    />
                  </Modal>
                )}
                {postType === "link" && (
                  <div className="create-post-form-input">
                    <textarea
                      placeholder="Url"
                      className="create-post-input link-input"
                      onChange={(e) => setlink_url(e.target.value)}
                      value={link_url}
                    ></textarea>
                  </div>
                )}
                <div className="create-post-form-errors">
                  {postType === "link" &&
                    linkErrors.length > 0 &&
                    linkErrors.map((error, idx) => (
                      <div key={idx}>{error}</div>
                    ))}
                  {postType === "image" &&
                    imageErrors.length > 0 &&
                    imageErrors.map((error, idx) => (
                      <div key={idx}>{error}</div>
                    ))}

                  {postType === "post" &&
                    errors.length > 0 &&
                    errors.map((error, idx) => <div key={idx}>{error}</div>)}
                </div>
                <div className="create-post-form-buttons">
                  <button
                    className="create-post-form-cancel"
                    onClick={cancelPost}
                  >
                    Cancel
                  </button>

                  <button
                    disabled={disabled}
                    type="submit"
                    className="create-post-form-submit"
                  >
                    Post
                  </button>
                </div>
                {showDiscardModal && (
                  <Modal
                    title="Discard post?"
                    onClose={() => setShowDiscardModal(false)}
                    open={() => setShowDiscardModal(true)}
                  >
                    <DiscardPost
                      community_id={community_id}
                      setShowDiscardModal={setShowDiscardModal}
                      showDiscardModal={showDiscardModal}
                    />
                  </Modal>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
      <div className="create-post-page-right">
        {community && (
          <>
            <CommunityDetails community={community} post={null} />
            <CommunityRulesBox community={community} />
          </>
        )}
        <RibbitRules />
      </div>
    </div>
  );
}
