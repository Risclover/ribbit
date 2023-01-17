const LOAD_COMMUNITY = "communities/LOAD_SINGLE_COMMUNITY";

export const loadCommunity = (community) => {
  return {
    type: LOAD_COMMUNITY,
    community,
  };
};
