import React, { useState } from "react";

export default function ImagePostForm() {
  return (
    <div className="image-post-form">
      <form>
        <input type="text" placeholder="Title" />
        <input type="file" onChange={(e) => showPreview(e)} accept="image/*" />
      </form>
    </div>
  );
}
