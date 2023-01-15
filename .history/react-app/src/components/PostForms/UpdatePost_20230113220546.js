import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSinglePost } from "../../store/one_post";
import "./PostForm.css";

export default function UpdatePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => Object.values(state.singlePost));
  console.log("This is my post:", post);
  const [title, setTitle] = useState(post[0]?.title);
  const [content, setContent] = useState(post[0]?.content);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = [];
    if (errors.length > 0) {
      setErrors(errors);
    } else {
      const data = dispatch(updateSinglePost({ title, content }, post[0].id));
      if (data.errors) {
        setErrors(data.errors);
      } else {
        history.push(`/posts/${post[0].id}`);
      }
    }
  };

  return (
    <div className="update-post-form-container">
      <form className="update-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Title"
        />
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Content"
        ></textarea>
        <button className="update-post-submit">Submit</button>
      </form>
    </div>
  );
}
