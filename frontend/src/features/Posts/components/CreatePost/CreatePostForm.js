import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { addImagePost, addLinkPost, addPost, addPostVote } from "@/store";
import {
  CreatePostFormTitle,
  CreatePostFormContent,
  CreatePostFormErrors,
  PostTypeBar,
  CommunitySelection,
  DiscardPost,
} from "@/features";
import { Modal } from "@/context";
import isURL from "validator/lib/isURL.js";
import { getIdFromName } from "@/utils/getCommunityIdFromName";
import { usePostDraft } from "@/features/Posts/hooks/usePostDraft";

export function CreatePostForm({
  postType,
  setPostType,
  community,
  setCommunity,
}) {
  const { communityName } = useParams();
  const history = useHistory();
  const dispatch = useAppDispatch();

  // ---------- persistent draft ----------
  const { draft, updateDraft, clearDraft } = usePostDraft();

  // ---------- local state (mirrors draft) ----------
  const [title, setTitle] = useState(draft.title || "");
  const [imgUrl, setImgUrl] = useState(draft.imgUrl || "");
  const [linkUrl, setLinkUrl] = useState(draft.linkUrl || "");
  const [content, setContent] = useState(draft.content || "");
  const [errors, setErrors] = useState([]);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [communityId, setCommunityId] = useState(null);

  // ---------- sync local ⇆ draft ----------
  useEffect(() => updateDraft("title", title), [title, updateDraft]);
  useEffect(() => updateDraft("content", content), [content, updateDraft]);
  useEffect(() => updateDraft("imgUrl", imgUrl), [imgUrl, updateDraft]);
  useEffect(() => updateDraft("linkUrl", linkUrl), [linkUrl, updateDraft]);

  // ---------- get community id ----------
  const communities = useAppSelector((state) =>
    Object.values(state.communities.communities)
  );
  useEffect(() => {
    if (communityName) {
      setCommunityId(getIdFromName(communityName, communities));
    } else {
      setCommunityId(null);
    }
  }, [communityName, communities]);

  // ---------- submit helpers ----------
  const handleGeneralSubmit = (data) => {
    clearDraft();
    history.push(`/c/${communityName}`);
    dispatch(addPostVote(data?.id, "upvote"));
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!communityId) return setErrors(["Please select a community."]);
    const data = await dispatch(addPost({ title, content, communityId }));
    handleGeneralSubmit(data);
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!communityId) return setErrors(["Please select a community."]);
    const data = await dispatch(addLinkPost({ title, linkUrl, communityId }));
    handleGeneralSubmit(data);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!communityId) return setErrors(["Please select a community."]);
    const data = await dispatch(addImagePost({ title, imgUrl, communityId }));
    handleGeneralSubmit(data);
  };

  const cancelPost = (e) => {
    e.preventDefault();
    if (content.replace(/<(.|\n)*?>/g, "").trim().length > 0) {
      setShowDiscardModal(true);
    } else {
      clearDraft();
      history.push(communityId ? `/c/${communityName}` : "/");
    }
  };

  // ---------- enable / disable POST btn ----------
  useEffect(() => {
    const emptyText = content.replace(/<(.|\n)*?>/g, "").trim().length === 0;
    const linkInvalid = postType === "link" && (!linkUrl || !isURL(linkUrl));

    setDisabled(
      title.length === 0 ||
        !communityId ||
        (postType === "post" && emptyText) ||
        (postType === "image" && !imgUrl) ||
        linkInvalid
    );
  }, [title, content, imgUrl, postType, linkUrl, communityId]);

  // ---------- render ----------
  return (
    <form
      className="create-post-form"
      onSubmit={
        postType === "post"
          ? handlePostSubmit
          : postType === "image"
          ? handleImageSubmit
          : handleLinkSubmit
      }
    >
      <div className="create-post-header">Create a post</div>

      <CommunitySelection
        communityId={communityId}
        setCommunityId={setCommunityId}
        community={community}
        setCommunity={setCommunity}
      />

      <div className="create-post-content">
        <PostTypeBar postType={postType} setPostType={setPostType} />
        <div className="create-post-form-inputs">
          {/* TITLE, BODY, ERRORS */}
          <CreatePostFormTitle title={title} setTitle={setTitle} />

          <CreatePostFormContent
            imgUrl={imgUrl}
            setImgUrl={setImgUrl}
            linkUrl={linkUrl}
            setLinkUrl={setLinkUrl}
            content={content}
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

          {/* BUTTONS */}
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
        </div>
        {/* DISCARD MODAL */}
        {showDiscardModal && (
          <Modal
            close={showDiscardModal}
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
    </form>
  );
}
