import React, { useState } from "react";
import "@/assets/styles/Modals.css";

export function ImagePostForm({ imgUrl, setImgUrl, setShowImgModal }) {
  const [imgPreview, setImgPreview] = useState(imgUrl);
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
    setErrorMsg("");
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
      setImgUrl(data.url);
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
            <img
              className="image-post-preview"
              src={imgPreview}
              alt="Preview"
            />
          )}
          <div className="user-img-error">
            {errorMsg} {imageLoading && <p className="loading">Loading...</p>}
          </div>
          <label className="post-img-btn-box" htmlFor="post-img">
            <div className="post-img-btn">Upload Image</div>
          </label>
        </div>
      </div>

      <div className="modal-buttons">
        <button
          className="blue-btn-unfilled-modal btn-short"
          onClick={() => setShowImgModal(false)}
        >
          Cancel
        </button>
        {image !== null ? (
          <button className="blue-btn-filled btn-short" onClick={handleSubmit}>
            Submit
          </button>
        ) : (
          <button className="blue-btn-filled btn-short" disabled>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
