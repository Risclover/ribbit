import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { putSinglePost } from "@/store";
import { Modal } from "@/context";
import { ImagePostForm } from "./ImagePostForm";
import "react-quill/dist/quill.snow.css";
import "../CreatePost/PostForm.css";
import "../../Posts.css";

export function UpdateImagePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) => Object.values(state.singlePost));

  const [title, setTitle] = useState(post[0]?.title);
  const [content, setContent] = useState(post[0]?.content);
  const [showImgModal, setShowImgModal] = useState(false);
  const [img_url, setimg_url] = useState(post[0]?.img_url);

  useEffect(() => {
    setContent(post[0]?.content);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let titles = [];
    let contents = [];

    if (title.trim().length === 0)
      titles.push("Please give your post a title.");
    if (content.trim().length === 0)
      contents.push("Please give your post some content.");
    if (titles.length > 0 || contents.length > 0) {
    } else {
      const data = await dispatch(
        putSinglePost(
          { title: title.trim(), content: content.trim() },
          post[0].id
        )
      );
      if (data.errors) {
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
        <img className="image-post-preview" src={img_url} alt="Preview" />{" "}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
