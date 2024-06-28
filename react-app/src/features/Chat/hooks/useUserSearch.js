import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useUserSearch = (username) => {
  const [userFound, setUserFound] = useState(null);
  const users = useSelector((state) => Object.values(state.users));

  useEffect(() => {
    setUserFound(
      users.find(
        (user) => user.username?.toLowerCase() === username.toLowerCase()
      )
    );
  }, [username, users]);

  return userFound;
};
