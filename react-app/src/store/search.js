const SEARCH = "queries/SEARCH";
const SET_SEARCH_QUERY = "queries/SET_SEARCH_QUERY";

export const searchQueries = (results) => {
  return {
    type: SEARCH,
    results,
  };
};

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const getSearchResults = () => async (dispatch) => {
  const response = await fetch("/api/search/results");
  if (response.ok) {
    const data = await response.json();
    dispatch(searchQueries(data));
    return data;
  }
};

export const search = (query) => async (dispatch) => {
  let formattedQuery = query.split("+").join(" ");
  const response = await fetch(`/api/search/${formattedQuery}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(searchQueries(data));
    return data;
  }
};

const initialState = {};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH:
      return action.results.query.reduce((results, result) => {
        results[result.id] = result;
        return results;
      }, {});
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
}
