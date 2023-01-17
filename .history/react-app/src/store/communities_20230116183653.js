const LOAD_COMMUNITIES = "communities/LOAD";
const LOAD_COMMUNITY = "communities/LOAD_SINGLE";
const CREATE_COMMUNITY = "communities/CREATE";

export const loadCommunities = (communitiess) => {
  return {
    type: LOAD_COMMUNITIES,
    communities,
  };
};
