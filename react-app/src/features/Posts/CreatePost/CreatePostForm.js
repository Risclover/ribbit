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


  useEffect(() => {
    setCommunityId(getIdFromName(communityName));
  }, [communityName]);

  //   useEffect(() => {
  //     if (communityName !== "") {
  //       communities.find(
  //         (comm) => comm.name === communityName && setCommunity(comm)
  //       );
  //     }
  //   }, [communityName]);

  const handleGeneralSubmit = (data) => {
    history.push(`/c/${communityName}`);
    dispatch(addPostVote(data.id, "upvote"));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      communityId,
    };
    const data = await dispatch(addPost(payload));
    handleGeneralSubmit(data);
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      linkUrl,
      communityId,
    };
    const data = await dispatch(addLinkPost(payload));
    handleGeneralSubmit(data);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      imgUrl,
      communityId,
    };
    const data = await dispatch(addImagePost(payload));
    handleGeneralSubmit(data);
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
            title={title}
            community={community}
            imgUrl={imgUrl}
            linkUrl={linkUrl}
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
