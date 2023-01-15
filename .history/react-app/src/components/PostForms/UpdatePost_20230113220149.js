import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSinglePost } from "../../store/one_post";
import "./PostForm.css";

export default function UpdatePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state.posts[+postId]);
  console.log("This is my post:", post);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="update-post-form-container">
      <form className="update-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        <button className="update-post-submit">Submit</button>
      </form>
    </div>
  );
}
