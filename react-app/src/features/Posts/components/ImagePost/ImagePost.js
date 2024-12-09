import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addImagePost } from "@/store";
import { Modal } from "@/context";
import { ImagePostForm } from "./ImagePostForm";

export const ImagePost = ({ img_url, setimg_url }) => {
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
        <Modal
          title="Upload Image"
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
      <img className="image-post-preview" src={img_url} />{" "}
      <button type="submit">Submit</button>
    </form>
  );
};
