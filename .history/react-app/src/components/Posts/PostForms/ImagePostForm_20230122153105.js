import React, { useState } from "react";
import "./ImagePostForm.css";
import { useDispatch } from "react-redux";
import { addPost } from "../../../store/posts";
import { useHistory } from "react-router-dom";

export default function ImagePostForm() {
  const [imgPreview, setImgPreview] = useState();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [community_id, setcommunity_id] = useState(communityId);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const history = useHistory();
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const showPreview = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let src = URL.createObjectURL(e.target.files[0]);
      setImgPreview(src);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    setImageLoading(true);

    const res = await fetch(`/api/posts/img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setContent(data.url);
      setImageLoading(false);
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }

    const data = await dispatch(addPost({ title, content, community_id }));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/c/${community_id}`);
    }
  };
  return (
    <div className="image-post-form">
      <h1>Heroo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label className="post-img-btn" htmlFor="post-img">
          Upload{" "}
        </label>
        <input
          id="post-img"
          type="file"
          onChange={(e) => showPreview(e)}
          accept="image/*"
          value={content}
        />
        <button type="submit">Submit</button>
      </form>
      <img src={imgPreview} />
    </div>
  );
}
