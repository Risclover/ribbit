import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkUsername } from "store";

export const useUsernameTaken = (username) => {
  const dispatch = useDispatch();
  const [usernameTaken, setUsernameTaken] = useState(false);

  const checkUsernameTaken = async () => {
    const res = await dispatch(checkUsername(username));
    const { Message } = await res.json();
    return Message;
  };

  useEffect(() => {
    const fetchUsernameTaken = async () => {
      const taken = await checkUsernameTaken();
      setUsernameTaken(taken);
    };

    fetchUsernameTaken().catch(console.error);
  }, [username, checkUsernameTaken]);

  return usernameTaken;
};
