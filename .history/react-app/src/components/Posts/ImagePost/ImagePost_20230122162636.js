import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import { addImagePost, addPost } from "../../../store/posts";
import ImagePostForm from "./ImagePostForm";

const ImagePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const [imgUrl, setImgUrl] = useState("");
  const [showImgModal, setShowImgModal] = useState(false);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addImagePost({ title, imgUrl, communityId }));
    history.push(`/c/${communityId}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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
            setImgUrl={setImgUrl}
            imgUrl={imgUrl}
          />
        </Modal>
      )}
      <img src={imgUrl} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImagePost;
