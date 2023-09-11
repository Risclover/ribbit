import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const DropBox = ({
  community,
  setImage,
  startingImage,
  image,
  bodyBgPreview,
  setBodyBgPreview,
  bgFormat,
  bodyBg,
  setBodyBg,
  setDefaultIcon,
  dropboxType,
}) => {
  const [highlight, setHighlight] = React.useState(false);
  const [preview, setPreview] = React.useState(startingImage);
  const [drop, setDrop] = React.useState(false);
  const [showBar, setShowBar] = useState(true);

  useEffect(() => {
    if (community.communityImg !== "https://i.imgur.com/9CI9hiO.png") {
      setShowBar(true);
    }
  }, [community]);

  const handleEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("enter!");

    preview === "" && setHighlight(true);
  };

  const handleOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("over!");

    preview === "" && setHighlight(true);
  };

  const handleLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leave!");
    setHighlight(false);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("drop!");
    setHighlight(false);
    setDrop(true);

    const [file] = e.target.files || e.dataTransfer.files;

    setImage(file);

    uploadFile(file);
  };

  const uploadFile = (file) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = () => {
      // this is the base64 data
      const fileRes = btoa(reader.result);
      console.log(`data:image/jpg;base64,${fileRes}`);
      setPreview(`data:image/jpg;base64,${fileRes}`);
      setShowBar(true);
    };

    reader.onerror = () => {
      console.log("There is a problem while uploading...");
    };
  };

  const handleErase = () => {
    setDrop(false);
    setHighlight(true);
    setShowBar(false);
    setPreview("");
    if (dropboxType === "community_icon") {
      setDefaultIcon(true);
      setImage("https://i.imgur.com/9CI9hiO.png");
    }
    if (bgFormat === "fill") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${preview}) no-repeat center / cover`
      );
    } else if (bgFormat === "tile") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${preview}) repeat center top`
      );
    } else if (bgFormat === "center") {
      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg} url(${preview}) no-repeat center top`
      );
    }

    if (dropboxType === "community_bg") {
      setBodyBgPreview("");

      document.documentElement.style.setProperty(
        "--preview-community-body-bg-img",
        `${bodyBg}`
      );
    }
  };

  return (
    <div className="dropbox">
      <div
        onDragEnter={(e) => handleEnter(e)}
        onDragLeave={(e) => handleLeave(e)}
        onDragOver={(e) => handleOver(e)}
        onDrop={(e) => handleUpload(e)}
        className={`upload${
          highlight
            ? " is-highlight"
            : drop
            ? " is-drop"
            : preview
            ? " is-preview"
            : ""
        }`}
        style={{ backgroundImage: `url(${preview})` }}
      >
        <label>
          <div className="preview-community-upload-icon">
            <FaCloudUploadAlt />
          </div>
          <div className="preview-community-upload-txt">
            Drag and Drop or Upload Image
          </div>
          <div className="upload-button">
            <input
              type="file"
              className="upload-file"
              accept="image/*"
              onChange={(e) => handleUpload(e)}
              hidden
            />
          </div>
        </label>
        <div
          className={`preview-community-icon-preview-bar ${
            showBar ? "icon-preview-appear" : "icon-preview-hidden"
          }`}
          onClick={handleErase}
        >
          <button>
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};
export default DropBox;
