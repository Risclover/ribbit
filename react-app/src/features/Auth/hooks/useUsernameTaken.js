import { useEffect, useState } from "react";

export const useUsernameTaken = (username) => {
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
