import { useEffect, useState } from "react";
import { useCheckCommunityName } from "../services/apiService";

/**
 * A custom hook that checks whether or not a community's name is already taken.
 *
 * @param {string} communityName - The name of the community.
 * @returns {boolean} Whether or not the community name (communityName) is already taken.
 */

export const useCommunityNameTaken = (communityName) => {
  const [communityNameTaken, setCommunityNameTaken] = useState(false);
  const { checkNameTaken } = useCheckCommunityName(communityName);

  useEffect(() => {
    const fetchCommunityNameTaken = async () => {
      const taken = await checkNameTaken();
      setCommunityNameTaken(taken);
    };

    fetchCommunityNameTaken().catch(console.error);
  }, [communityName, checkNameTaken]);

  return communityNameTaken;
};
