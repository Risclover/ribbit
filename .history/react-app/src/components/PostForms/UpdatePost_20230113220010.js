import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSinglePost } from "../../store/one_post";

export default function UpdatePost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state.post[+postId]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [errors, setErrors] = useState([]);
  return (
    <div className="update-post-form-container">
      <form className="update-post-form"></form>
    </div>
  );
}
