import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "@/store";
// import "@/components/Modals/Modals.css";
import "./UploadImageModal.css";

export function UploadImage({ img_url, setShowUploadModal, userId }) {
  const dispatch = useDispatch();

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
    setErrorMsg("");
    const formData = new FormData();
    formData.append("image", image);

    setImageLoading(true);

    const res = await fetch(`/api/users/${+userId}/img/profile`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      dispatch(getUsers());
      setShowUploadModal(false);
    } else {
      setImageLoading(false);
      setErrorMsg(
        "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
      );
    }
  };

  return (
    <div className="modal-container">
      <form>
        <div className="modal-content">
          <div className="upload-user-img">
            <div className="user-img-preview-box">
              <img
                className="user-img-preview"
                src={imgPreview}
                alt="Preview"
              />
              <div className="user-img-error">
                {errorMsg}{" "}
                {imageLoading && <p className="loading">Loading...</p>}
              </div>
            </div>
            <label htmlFor="upload-user-img">
              <input
                id="upload-user-img"
                type="file"
                accept="image/png, image/jpg"
                onChange={showPreview}
                hidden
              />
              <span className="fake-upload-btn">Choose Image</span>
            </label>
          </div>
        </div>
        <div className="modal-buttons">
          <button
            className="blue-btn-unfilled-modal btn-short"
            onClick={() => setShowUploadModal(false)}
          >
            Cancel
          </button>
          {image ? (
            <button
              className="blue-btn-filled btn-short"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button className="modal-buttons-disabled" disabled>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
