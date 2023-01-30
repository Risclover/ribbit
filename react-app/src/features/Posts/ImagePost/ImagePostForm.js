import React, { useState } from "react";

import "./ImagePostForm.css";

export default function ImagePostForm({
  img_url,
  setimg_url,
  setShowImgModal,
}) {
  const [imgPreview, setImgPreview] = useState(img_url);
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
      setImageLoading(false);
      setimg_url(data.url);
      setShowImgModal(false);
    } else {
      setImageLoading(false);
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
      <img className="image-post-preview" src={imgPreview} />
    </div>
  );
}
