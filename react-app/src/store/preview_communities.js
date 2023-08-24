const LOAD = "preview_communities/LOAD";

export const loadCommunity = (communityPreview) => {
  return {
    type: LOAD,
    communityPreview,
  };
};

export const getCommunityPreview = (communityId) => async (dispatch) => {
  const response = await fetch(`/api/preview_communities/${communityId}/style`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadCommunity(data));
    return data;
  }
};

export const updateCommunityPreview = (payload) => async (dispatch) => {
  const { communityId, baseColor, highlight, bodyBackground } = payload;

  const response = await fetch(
    `/api/preview_communities/${communityId}/style/edit`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ baseColor, highlight, bodyBackground }),
    }
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(loadCommunity(data));
    return data;
  }
};

const initialState = {};

export default function previewCommunitiesReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case LOAD:
      return {
        [action.communityPreview.id]: { ...action.communityPreview },
      };
    default:
      return state;
  }
}
