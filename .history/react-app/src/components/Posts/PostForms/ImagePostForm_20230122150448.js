import React, { useState } from "react";
import "./ImagePostForm.css";

export default function ImagePostForm() {
  const [imgPreview, setImgPreview] = useState();

  const showPreview = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let src = URL.createObjectURL(e.target.files[0]);
      setImgPreview(src);
    }
  };
  return (
    <div className="image-post-form">
      <h1>Heroo</h1>
      <form>
        <input type="text" placeholder="Title" />
        <label className="post-img-btn">
          Upload
          <input
            id="post-img"
            type="file"
            onChange={(e) => showPreview(e)}
            accept="image/*"
          />
        </label>
      </form>
      <img src={imgPreview} />
    </div>
  );
}
