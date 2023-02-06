import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Modal } from "../../../context/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useDispatch, useSelector } from "react-redux";
import { putSinglePost, putImagePost } from "../../../store/posts";
import ImagePostForm from "./ImagePostForm";
import "../PostForms/PostForm.css";
import "../../Posts/Posts.css";

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

export default function UpdateImagePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => Object.values(state.singlePost));
  const [title, setTitle] = useState(post[0]?.title);
  const [content, setContent] = useState(post[0]?.content);
  const [disabled, setDisabled] = useState(false);
  const [showImgModal, setShowImgModal] = useState(false);
  const [postType, setPostType] = useState("post");
  const [img_url, setimg_url] = useState(post[0]?.img_url);
  const [titleErrors, setTitleErrors] = useState([]);
  const [contentErrors, setContentErrors] = useState([]);
  const [errors, setErrors] = useState([]);

  const handlePostTypeChange = (e, type) => {
    e.preventDefault();
    setPostType("post");
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setPostType("image");
    dispatch(putImagePost(+postId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let titles = [];
    let contents = [];

    if (title.trim().length === 0)
      titles.push("Please give your post a title.");
    if (content.trim().length === 0)
      contents.push("Please give your post some content.");
    if (titles.length > 0 || contents.length > 0) {
      setTitleErrors(titles);
      setContentErrors(contents);
    } else {
      const data = await dispatch(
        putSinglePost(
          { title: title.trim(), content: content.trim() },
          post[0].id
        )
      );
      if (data.errors) {
        setErrors(data.errors);
      } else {
        history.push(`/posts/${postId}`);
      }
    }
  };

  return (
    <div className="update-post-form-container">
      <div className="update-post-form-header">Update post</div>
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
          <Modal title="Upload Image" onClose={() => setShowImgModal(false)}>
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
    </div>
  );
}
