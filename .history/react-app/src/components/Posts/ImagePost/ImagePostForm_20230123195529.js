import React, { useState } from "react";
import "./ImagePostForm.css";
import { useDispatch } from "react-redux";
import { addPost } from "../../../store/posts";
import { useHistory, useParams } from "react-router-dom";

export default function ImagePostForm({ setimg_url, setShowImgModal }) {
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
      const file = e.target.files[0];
      setImage(file);
      let src = URL.createObjectURL(file);
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
      console.log("IMAGE DATA", data);
      setImageLoading(false);
      setimg_url(data.url);
      setShowImgModal(false);
      // return data;
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };

  return (
    <div className="image-post-form">
      <form>
        <label className="post-img-btn" htmlFor="post-img">
          Upload{" "}
        </label>
        <input
          id="post-img"
          type="file"
          onChange={showPreview}
          accept="image/*"
        />
        {image ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button disabled>Submit</button>
        )}
      </form>
      {imageLoading && <p>Loading...</p>}
      <img src={imgPreview} />
    </div>
  );
}
