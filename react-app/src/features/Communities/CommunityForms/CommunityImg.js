import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const CommunityImg = () => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const { communityId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    setImageLoading(true);

    const res = await fetch(`/api/communities/${+communityId}/img`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push(`/c/${communityId}/edit`);
    } else {
      setImageLoading(false);
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={updateImage} />
      <button type="submit">Submit</button>
      {imageLoading && <p>Loading...</p>}
    </form>
  );
};

export default CommunityImg;
