import React, { useState } from "react";
import "./ImagePostForm.css";
import { useDispatch } from "react-redux";
import { addPost } from "../../../store/posts";
import { useHistory, useParams } from "react-router-dom";

export default function ImagePostForm({ setImgUrl, setShowImgModal }) {
  const { communityId } = useParams();
  const [imgPreview, setImgPreview] = useState();
  const [community_id, setcommunity_id] = useState(communityId);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
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

    const res = await fetch(`/api/posts/images`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setImgUrl(data.url);
      setImageLoading(false);
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };

  return (
    <div className="image-post-form">
      <form onSubmit={handleSubmit}>
        <label className="post-img-btn" htmlFor="post-img">
          Upload{" "}
        </label>
        <input
          id="post-img"
          type="file"
          onChange={(e) => showPreview(e)}
          accept="image/*"
          value={imgUrl}
        />
        <button type="submit">Submit</button>
      </form>
      <img src={imgPreview} />
    </div>
  );
}
