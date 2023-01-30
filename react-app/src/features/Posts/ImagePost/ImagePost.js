import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { addImagePost } from "../../../store/posts";

import { Modal } from "../../../context/Modal";
import ImagePostForm from "./ImagePostForm";

const ImagePost = ({ img_url, setimg_url }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { communityId } = useParams();
  const [community_id, setcommunity_id] = useState(+communityId);
  const [showImgModal, setShowImgModal] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setcommunity_id(+communityId);
    dispatch(addImagePost({ title, img_url, community_id }));
    history.push(`/c/${+communityId}`);
  };

  return (
    <form className="image-post" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowImgModal(true);
        }}
      >
        Add Image
      </button>
      {showImgModal && (
        <Modal onClose={() => setShowImgModal(false)}>
          <ImagePostForm
            setShowImgModal={setShowImgModal}
            setimg_url={setimg_url}
            img_url={img_url}
          />
        </Modal>
      )}
      <img className="image-post-preview" src={img_url} />{" "}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImagePost;
