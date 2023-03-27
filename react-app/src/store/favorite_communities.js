const LOAD = "favorite_communities/LOAD";
const ADD = "favorite_communities/ADD";

const load = (data) => {
  return {
    type: LOAD,
    data,
  };
};

export const getFavoriteCommunities = () => async (dispatch) => {
  const response = await fetch("/api/favorite_communities");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

const initialState = {};

export default function favoriteCommunitiesReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LOAD:
      return action.favoriteCommunities.communities.reduce(
        (communities, community) => {
          communities[community.id] = community;
          return communities;
        },
        {}
      );
    default:
      return state;
  }
}
