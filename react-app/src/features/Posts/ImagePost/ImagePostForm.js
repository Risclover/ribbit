import React, { useState } from "react";

import "../../../components/Modals/Modals.css";

export default function ImagePostForm({
  img_url,
  setimg_url,
  showImgModal,
  setShowImgModal,
}) {
  const [imgPreview, setImgPreview] = useState(img_url);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg(
        "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
      );
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="img-post-modal">
          <input
            id="post-img"
            type="file"
            onChange={showPreview}
            accept="image/png, image/jpeg, image/jpg"
            hidden
          />
          {imgPreview && (
            <img className="image-post-preview" src={imgPreview} />
          )}
          <span className="user-img-error">{errorMsg}</span>
          {imageLoading && <p>Loading...</p>}
          <label className="post-img-btn-box" htmlFor="post-img">
            <div className="post-img-btn">Upload Image</div>
          </label>
        </div>
      </div>
      <div className="modal-buttons">
        <button
          className="modal-buttons-left"
          onClick={() => setShowImgModal(false)}
        >
          Cancel
        </button>
        {image !== null ? (
          <button className="modal-buttons-right" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="modal-buttons-right" disabled>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
