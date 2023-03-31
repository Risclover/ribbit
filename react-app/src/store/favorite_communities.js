const LOAD = "favorite_communities/LOAD";
const DELETE = "favorite_communities/DELETE";

const load = (favoriteCommunities) => {
  return {
    type: LOAD,
    favoriteCommunities,
  };
};

const remove = (communityId) => {
  return {
    type: DELETE,
    communityId,
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

export const addFavoriteCommunity = (communityId) => async (dispatch) => {
  const response = await fetch("/api/favorite_communities", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      communityId: communityId,
    }),
  });
  return response;
};

export const removeFavoriteCommunity = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/favorite_communities/${communityId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(remove(communityId));
    return deletedMessage;
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
    case DELETE:
      let removeState = { ...state };
      delete removeState[action.communityId];
      return removeState;
    default:
      return state;
  }
}
