import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { getUsers } from "../../store/users";

import "../../components/Modals/Modals.css";

export default function UploadBannerImage({
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
        "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
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
                <img className="banner-img-preview" src={imgPreview} />
              )}
              <div className="user-img-error">
                {errorMsg}{" "}
                {imageLoading && <p className="loading">Loading...</p>}
              </div>
            </div>
            <label for="upload-user-img">
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
            className="modal-buttons-left"
            onClick={() => setShowBannerModal(false)}
          >
            Cancel
          </button>
          {image ? (
            <button
              className="modal-buttons-right"
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
