import React, { useState } from "react";
import CommunityNameOption from "./CommunityNameOption";
import { FaTrash } from "react-icons/fa6";
import { RiUploadCloudFill } from "react-icons/ri";
import DropBox from "../../../../components/DragNDropImageUpload/DropBox";
import { useDispatch } from "react-redux";
import { getSingleCommunity } from "../../../../store/one_community";
import { defaultCommunityImg } from "../../../../store/communities";

export default function PreviewCommunityNameIcon({
  setOpenAppearance,
  community,
}) {
  const dispatch = useDispatch();
  const options = ["c/" + community.name, community.name, "Hide"];
  const [activeRadio, setActiveRadio] = useState(options[0]);
  const [image, setImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image === "https://i.imgur.com/9CI9hiO.png") {
      dispatch(defaultCommunityImg(community.id));
      dispatch(getSingleCommunity(community.id));
      setOpenAppearance(false);
    } else if (image && image !== "https://i.imgur.com/9CI9hiO.png") {
      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(`/api/communities/${community.id}/img`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        await res.json();
        dispatch(getSingleCommunity(community.id));
        setOpenAppearance(false);
      } else {
        setErrorMsg(
          "There was a problem with your upload. Make sure your file is a .jpg or .png file, and try again."
        );

        console.log(errorMsg);
      }
    }
  };

  return (
    <div className="preview-community-name-icon">
      <h1>Name & icon</h1>
      <div className="preview-community-theme-colors-box">
        <h2>Community Name Format</h2>
        <div className="preview-community-name-icon-box">
          {options.map((option) => (
            <CommunityNameOption
              title={option}
              activeRadio={activeRadio}
              setActiveRadio={setActiveRadio}
            />
          ))}
        </div>
      </div>
      <div className="preview-community-theme-colors-box">
        <h2>Community Icon</h2>
        <div className="preview-community-name-icon-box">
          <h3>Custom Image</h3>

          <DropBox
            community={community}
            setImage={setImage}
            startingImage={community.communityImg}
          />
          <p>Required size: 256x256px</p>
        </div>
      </div>
      <div className="preview-community-theme-btns">
        <button className="blue-btn-filled btn-long" onClick={handleSubmit}>
          Save
        </button>
        <button
          className="blue-btn-unfilled btn-long"
          onClick={() => setOpenAppearance(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
