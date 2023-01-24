import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import ImagePostForm from "./ImagePostForm";

const ImagePost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { communityId } = useParams();

  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [showImgModal, setShowImgModal] = useState(false);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button onClick={() => setShowImgModal(true)}>Add Image</button>
      {showImgModal && (
        <Modal onClose={() => setShowImgModal(false)}>
          <ImagePostForm
            setShowImgModal={setShowImgModal}
            setImgUrl={setImgUrl}
          />
        </Modal>
      )}
    </form>
  );
};

export default ImagePost;
