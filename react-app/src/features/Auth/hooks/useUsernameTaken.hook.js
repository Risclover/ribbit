import { useEffect, useState } from "react";
import { useCheckUsername } from "../services/apiService";

export const useUsernameTaken = (username) => {
  const [usernameTaken, setUsernameTaken] = useState(false);
  const { checkUsernameTaken } = useCheckUsername(username);

  useEffect(() => {
    const fetchUsernameTaken = async () => {
      const taken = await checkUsernameTaken();
      setUsernameTaken(taken);
    };

    fetchUsernameTaken().catch(console.error);
  }, [username, checkUsernameTaken]);

  return usernameTaken;
};
