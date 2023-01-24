import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UploadPicture from "./UploadPicture";

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <li>
        <img className="user-profile-img" src={user.profile_img} />
        <UploadPicture />
      </li>
    </ul>
  );
}
export default User;
