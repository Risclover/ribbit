import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "@/store";
// import "../Modals.css";
import "./UploadImageModal.css";

export function UploadBannerImageModal({
  img_url,
  setShowBannerModal,
  userId,
}) {
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

    const res = await fetch(`/api/users/${+userId}/img/banner`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      dispatch(getUsers());
      setShowBannerModal(false);
    } else {
      setImageLoading(false);
      setErrorMsg(
        "There was a problem with your upload. Make sure your file is a .jpg / .png file, and try again."
      );
    }
  };

  return (
    <div className="modal-container">
      <form>
        <div className="modal-content">
          <div className="upload-user-img">
            <div className="banner-img-preview-box">
              {imgPreview && (
                <img
                  className="banner-img-preview"
                  src={imgPreview}
                  alt="Banner preview"
                />
              )}
              <div className="user-img-error">
                {errorMsg}{" "}
                {imageLoading && <p className="loading">Loading...</p>}
              </div>
            </div>
            <label htmlFor="upload-user-img">
              <input
                id="upload-user-img"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
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
            onClick={() => setShowBannerModal(false)}
          >
            Cancel
          </button>

          <button
            className="blue-btn-filled btn-short"
            type="submit"
            onClick={handleSubmit}
            disabled={!image}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
