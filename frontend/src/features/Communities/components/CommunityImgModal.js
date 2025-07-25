import React, { useState } from "react";
import { useAppDispatch } from "@/store";
import { getCommunities } from "@/store";
import "@/assets/styles/Modals.css";

export function CommunityImgModal({ setShowCommunityImgModal, communityId }) {
  const dispatch = useAppDispatch();
  const [imgPreview, setImgPreview] = useState();
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

    const res = await fetch(`/api/communities/${communityId}/img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      setShowCommunityImgModal(false);
      dispatch(getCommunities());
    } else {
      setImageLoading(false);
      setErrorMsg(
        "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
      );
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content community-img-modal">
        <div className="img-post-modal">
          <input
            id="post-img"
            type="file"
            onChange={showPreview}
            accept="image/png, image/jpg"
            hidden
          />
          {imgPreview && (
            <img
              className="community-image-post-preview"
              src={imgPreview}
              alt="Preview"
            />
          )}
          <span className="user-img-error">{errorMsg}</span>
          {imageLoading && <p>Loading...</p>}
          <label
            className="post-img-btn-box"
            htmlFor="post-img"
            id="upload-img"
          >
            <div
              className="post-img-btn"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  document.getElementById("upload-img").click();
                }
              }}
            >
              Upload Image
            </div>
          </label>
        </div>
      </div>
      <div className="modal-buttons">
        <button
          className="blue-btn-unfilled-modal btn-short"
          onClick={() => setShowCommunityImgModal(false)}
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
