import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "@/store";
import { checkUsername } from "@/store";

export const useUsernameTaken = (username) => {
  const dispatch = useAppDispatch();
  const [usernameTaken, setUsernameTaken] = useState(false);

  const checkUsernameTaken = useCallback(async () => {
    if (username.trim() === "") {
      setUsernameTaken(false);
      return;
    }
    try {
      const res = await dispatch(checkUsername(username));
      const result = await res.json();
      setUsernameTaken(result.Message);
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameTaken(false);
    }
  }, [dispatch, username]);

  useEffect(() => {
    checkUsernameTaken();
  }, [username, checkUsernameTaken]);

  return usernameTaken;
};
