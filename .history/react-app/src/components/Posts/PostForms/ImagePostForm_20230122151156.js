import React, { useState } from "react";
import "./ImagePostForm.css";

export default function ImagePostForm() {
  const [imgPreview, setImgPreview] = useState();
  const [imgUrl, setImgUrl] = useState("");
  const [title, setTitle] = useState("");
  const history = useHistory(); // so that we can redirect after the image upload is successful
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const showPreview = (e) => {
    e.preventDefault();
    if (e.target.files.length > 0) {
      let src = URL.createObjectURL(e.target.files[0]);
      setImgPreview(src);
    }
  };

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
      const data = await res.json();
      setImgUrl(data.url);
      setImageLoading(false);
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };
  return (
    <div className="image-post-form">
      <h1>Heroo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" />
        <label className="post-img-btn" htmlFor="post-img">
          Upload{" "}
        </label>
        <input
          id="post-img"
          type="file"
          onChange={(e) => showPreview(e)}
          accept="image/*"
        />
        <button type="submit">Submit</button>
      </form>
      <img src={imgPreview} />
    </div>
  );
}
