import { useState, useEffect } from "react";
import { useAppSelector } from "@/store";

export const useUserSearch = (username) => {
  const [userFound, setUserFound] = useState(null);
  const users = useAppSelector((state) => Object.values(state.users.users));

  useEffect(() => {
    setUserFound(
      users.find(
        (user) => user.username?.toLowerCase() === username.toLowerCase()
      )
    );
  }, [username, users]);

  return { userFound };
};
