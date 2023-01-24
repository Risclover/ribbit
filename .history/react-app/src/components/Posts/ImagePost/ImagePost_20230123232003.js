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
  const [community_id, setcommunity_id] = useState(+communityId);
  const [img_url, setimg_url] = useState("");
  const [showImgModal, setShowImgModal] = useState(false);
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setcommunity_id(+communityId);

    console.log('RIGHT BEFORE:', img_url)
    )
    const data = await dispatch(
      addImagePost({ title, img_url: img_url, community_id })
    );

    console.log("DATA", data);
    history.push(`/c/${+communityId}`);
  };

  console.log("IMG URL:", img_url);

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
            setimg_url={setimg_url}
            img_url={img_url}
          />
        </Modal>
      )}
      <img src={img_url} /> {/* Shows the image preview */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ImagePost;
