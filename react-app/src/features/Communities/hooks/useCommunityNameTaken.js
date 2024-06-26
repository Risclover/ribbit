import { useEffect, useState } from "react";
import { useCheckCommunityName } from "../services/apiService";

export const useCommunityNameTaken = (name) => {
  const [communityNameTaken, setCommunityNameTaken] = useState(false);
  const { checkNameTaken } = useCheckCommunityName(name);

  useEffect(() => {
    const fetchCommunityNameTaken = async () => {
      const taken = await checkNameTaken();
      setCommunityNameTaken(taken);
    };

    fetchCommunityNameTaken().catch(console.error);
  }, [name, checkNameTaken]);

  return communityNameTaken;
};
