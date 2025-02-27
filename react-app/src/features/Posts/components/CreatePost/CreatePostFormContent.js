import React, { useState } from "react";
import ReactQuill from "react-quill";
import { richTextEditorModules } from "../../data/richTextEditorModules";
import { Modal } from "@/context";
import { ImagePostForm } from "../ImagePost";

export function CreatePostFormContent({
  setContent,
  postType,
  imgUrl,
  setImgUrl,
  linkUrl,
  setLinkUrl,
}) {
  const [showImgModal, setShowImgModal] = useState(false);

  const handleDeletePreview = (e) => {
    e.preventDefault();
    setImgUrl(undefined);
  };
  return (
    <>
      {postType === "post" && (
        <div className="create-post-form-input">
          <ReactQuill
            theme="snow"
            modules={richTextEditorModules}
            onChange={setContent}
            placeholder="Text (required)"
          />
        </div>
      )}
      {postType === "image" && (
        <div className="image-post-box">
          {!imgUrl && (
            <button
              className="create-post-form-cancel"
              onClick={(e) => {
                e.preventDefault();
                setShowImgModal(true);
              }}
            >
              Choose Image
            </button>
          )}
          {imgUrl && (
            <div
              className="image-post-preview-box"
              onClick={() => setShowImgModal(true)}
            >
              <div
                className="image-preview-box"
                style={{
                  backgroundImage: `url(${imgUrl}`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <button
                  aria-label="Close"
                  className="close-preview-btn"
                  onClick={handleDeletePreview}
                >
                  <i className="fa-solid fa-circle-xmark close-preview-img"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {showImgModal && (
        <Modal
          close={showImgModal}
          onClose={() => setShowImgModal(false)}
          open={() => setShowImgModal(true)}
        >
          <ImagePostForm
            setShowImgModal={setShowImgModal}
            setImgUrl={setImgUrl}
            imgUrl={imgUrl}
          />
        </Modal>
      )}
      {postType === "link" && (
        <div className="create-post-form-input">
          <textarea
            placeholder="Url"
            className="create-post-input link-input"
            onChange={(e) => setLinkUrl(e.target.value)}
            value={linkUrl}
          ></textarea>
        </div>
      )}
    </>
  );
}
