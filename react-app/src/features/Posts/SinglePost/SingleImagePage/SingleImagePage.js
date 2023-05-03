import React from "react";
import "./SingleImagePage.css";
export default function SingleImagePage({ image }) {
  return (
    <div className="single-image-page">
      <img src={image} className="single-image-page-img" alt="" />
    </div>
  );
}
