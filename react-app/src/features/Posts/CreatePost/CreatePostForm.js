import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addImagePost,
  addLinkPost,
  addPost,
  addPostVote,
  getPosts,
} from "../../../store";
import { useHistory } from "react-router-dom";
import { CreatePostFormTitle } from "./CreatePostFormTitle";
import { CreatePostFormContent } from "./CreatePostFormContent";
import { validateImgPost } from "../utils/validateImgPost";
import { validateLinkPost } from "../utils/validateLinkPost";
import { validatePost } from "../utils/validatePost";
import { useDispatch, useSelector } from "react-redux";
import { CommunitySelection } from "./CommunitySelection";
import { PostTypeBar } from "./PostTypeBar";
import { CreatePostFormErrors } from "./CreatePostFormErrors";
import { Modal } from "../../../context";
import { DiscardPost } from "../DiscardPost";
import validator from "validator";

export function CreatePostForm({
  postType,
  setPostType,
  community,
  setCommunity,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { communityName } = useParams();

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [linkErrors, setLinkErrors] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const communities = useSelector((state) => Object.values(state.communities));
  const posts = useSelector((state) => state.posts);

  const getIdFromName = (name) => {
    let result = Object.values(communities).find(
      (community) => community.name === name
    );
    return result ? result.id : null;
  };

  const [communityId, setCommunityId] = useState(getIdFromName(communityName));

  console.log("communityId:", getIdFromName(communityName));

  useEffect(() => {
    if (communityName !== "") {
      communities.find(
        (comm) => comm.name === communityName && setCommunity(comm)
      );
    }
  }, [communityName]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(addPost({ title, content, communityId }));
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
    dispatch(addLinkPost({ title, linkUrl, communityId }));
    history.push(`/c/${communityName}`);
    await dispatch(getPosts());
    dispatch(addPostVote(postId, "upvote"));
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const postId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1;
    const payload = {
      title,
      imgUrl,
      communityId,
    };
    console.log("payload:", payload);
    const data = await dispatch(addImagePost(payload));
    console.log("data:", data);
    history.push(`/c/${communityName}`);
    dispatch(getPosts());
    dispatch(addPostVote(data.id, "upvote"));
  };

  const handleErrors = () => {
    switch (postType) {
      case "link":
        setLinkErrors(validateLinkPost(community, title, linkUrl));
      case "image":
        setImageErrors(validateImgPost(community, title, imgUrl));
      case "post":
        setErrors(validatePost(community, title));
      default:
        return null;
    }
  };

  const cancelPost = (e) => {
    e.preventDefault();
    if (content.length > 0 && postType === "post") {
      setShowDiscardModal(true);
    } else {
      if (
        communityId !== undefined &&
        communityId !== "undefined" &&
        communityId &&
        !isNaN(communityId)
      ) {
        history.push(`/c/${communityName}`);
      } else {
        history.push("/home");
      }
    }
  };

  useEffect(() => {
    if (content.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setContent("");
      setDisabled(true);
    }

    if (
      (postType === "image" &&
        (imgUrl === "" || imgUrl === undefined || imgUrl === null)) ||
      (postType === "link" &&
        (linkUrl.length === 0 || !validator.isURL(linkUrl))) ||
      title.length === 0 ||
      communityName === undefined
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [
    dispatch,
    title,
    content,
    imgUrl,
    communities,
    communityId,
    postType,
    linkUrl,
    communityName,
  ]);

  return (
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
        communityId={communityId}
        community={community}
        setCommunity={setCommunity}
        setCommunityId={setCommunityId}
      />

      <div className="create-post-content">
        <PostTypeBar postType={postType} setPostType={setPostType} />
        <div className="create-post-form-inputs">
          <CreatePostFormTitle title={title} setTitle={setTitle} />
          <CreatePostFormContent
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            linkUrl={linkUrl}
            setLinkUrl={setLinkUrl}
            setContent={setContent}
            postType={postType}
          />
          <CreatePostFormErrors
            postType={postType}
            linkErrors={linkErrors}
            imageErrors={imageErrors}
            errors={errors}
            title={title}
            community={community}
            imgUrl={imgUrl}
          />
          <div className="create-post-form-buttons">
            <button className="create-post-form-cancel" onClick={cancelPost}>
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
                communityName={communityName}
                setShowDiscardModal={setShowDiscardModal}
                showDiscardModal={showDiscardModal}
              />
            </Modal>
          )}
        </div>
      </div>
    </form>
  );
}
