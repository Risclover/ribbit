import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import moment from "moment";
import validator from "validator";

import { addLinkPost, addPost, addPostVote } from "../../../store/posts";
import { addImagePost } from "../../../store/posts";
import CommunityRule from "../../Communities/CommunityRule";
import { Modal } from "../../../context/Modal";
import ImagePostForm from "../ImagePost/ImagePostForm";
import CommunitySelection from "./CreatePostDropdown/CommunitySelection";
import DiscardPost from "../DiscardPost";
import Cake from "../../../images/misc/piece4.png";
import Frog from "../../../images/ribbit-banners/frog-logo1.png";
import { CgNotes } from "react-icons/cg";
import { RxImage } from "react-icons/rx";
import { FiLink } from "react-icons/fi";

import "./PostForm.css";

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

export default function CreatePost({ postType, setPostType, val }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { communityId } = useParams();

  const [link_url, setlink_url] = useState("");
  const [community, setCommunity] = useState();
  const [title, setTitle] = useState("");
  const [members, setMembers] = useState(0);
  const [img_url, setimg_url] = useState("");
  const [content, setContent] = useState("");
  const [community_id, setcommunity_id] = useState(
    communityId === "undefined" ? "undefined" : +communityId
  );
  const [disabled, setDisabled] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [errors, setErrors] = useState([]);
  const [linkErrors, setLinkErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  // const community = useSelector(
  //   (state) => state.singleCommunity[+community_id]
  // );

  const posts = useSelector((state) => Object.values(state.posts));
  const communities = useSelector((state) => Object.values(state.communities));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    for (let community of communities) {
      if (community.id === community_id) {
        setCommunity(community);
      }
    }
  }, []);

  useEffect(() => {
    setMembers(community?.members);
  }, [community?.members]);

  useEffect(() => {
    setPostType(val);
  }, [val]);

  useEffect(() => {
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
  }, [link_url, title, community]);

  useEffect(() => {
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
  }, [img_url, title, community]);

  useEffect(() => {
    let errors = [];

    if (content === "") {
      errors.push("Enter some content.");
    }
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
  }, [content, title, community]);

  useEffect(() => {
    if (content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setContent("");
      setDisabled(true);
    }

    if (
      (postType === "post" && content.length === 0) ||
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

    for (let community of communities) {
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
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const data = dispatch(addPost({ title, content, community_id }));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setTitle("");
      setContent("");
      const postId = posts.length + 1;

      dispatch(addPostVote(postId, "upvote"));
      history.push(`/c/${community_id}`);
    }
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    dispatch(addLinkPost({ title, link_url, community_id }));
    history.push(`/c/${community_id}`);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    dispatch(addImagePost({ title, img_url, community_id }));
    history.push(`/c/${community_id}`);
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
      <div className="create-post-page-left">
        <div className="flex-maker">
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
                community_id={community_id}
                community={community}
                setCommunity={setCommunity}
                setcommunity_id={setcommunity_id}
              />

              <div className="create-post-content">
                <div className="post-type-bar">
                  <button
                    className={
                      postType === "post"
                        ? "post-type-post active-type"
                        : "post-type-post"
                    }
                    onClick={(e) => handlePostTypeChange(e, "post")}
                  >
                    <CgNotes /> Post
                  </button>
                  <button
                    className={
                      postType === "image"
                        ? "post-type-post active-type"
                        : "post-type-post"
                    }
                    onClick={(e) => handlePostTypeChange(e, "image")}
                  >
                    <RxImage /> Image
                  </button>
                  <button
                    className={
                      postType === "link"
                        ? "post-type-post active-type"
                        : "post-type-post"
                    }
                    onClick={(e) => handlePostTypeChange(e, "link")}
                  >
                    <FiLink /> Link
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
                        placeholder="Content"
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
                    <Modal onClose={() => setShowImgModal(false)}>
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
      </div>
      <div className="create-post-page-right">
        {community && (
          <>
            <div className="community-page-community-info">
              <div className="community-page-box-header"></div>
              <div className="community-title-details">
                <img
                  className="community-title-details-img"
                  src={community?.communityImg}
                  alt="Community"
                />
                <div className="community-title-details-name">
                  <NavLink to={`/c/${community?.id}`}>
                    c/{community?.name}
                  </NavLink>
                </div>
              </div>
              <div className="community-page-box-content">
                <div className="community-page-box-description">
                  <p>{community?.description}</p>
                </div>
                <div className="community-page-box-date">
                  <img src={Cake} className="community-cake-icon" alt="Cake" />
                  Created{" "}
                  {moment(new Date(community?.createdAt)).format(
                    "MMM DD, YYYY"
                  )}
                </div>
                <div className="community-page-box-members">
                  <h2>{members}</h2>
                  <span>{members === 1 ? "Member" : "Members"}</span>
                </div>
              </div>
            </div>

            {Object.values(community?.communityRules).length > 0 && (
              <div className="community-page-community-rules">
                <div className="community-page-rules-header">
                  c/{community?.name} Rules
                </div>
                <div className="community-page-rules">
                  <ol>
                    {Object.values(community?.communityRules).map(
                      (rule, idx) => (
                        <CommunityRule idx={idx} rule={rule} />
                      )
                    )}
                  </ol>
                </div>
              </div>
            )}
          </>
        )}
        <div className="ribbit-rules-box">
          <div className="ribbit-rules-title">
            <img className="ribbit-rules-frog" src={Frog} alt="Frog" />
            Posting to Ribbit
          </div>
          <div className="ribbit-rules-rule">1. Remember the human</div>
          <div className="ribbit-rules-rule">
            2. Behave like you would in real life
          </div>
          <div className="ribbit-rules-rule">
            3. Look for the original source of content
          </div>
          <div className="ribbit-rules-rule">
            4. Search for duplicates before posting
          </div>
          <div className="ribbit-rules-rule">5. Read the community's rules</div>
        </div>
      </div>
    </div>
  );
}
