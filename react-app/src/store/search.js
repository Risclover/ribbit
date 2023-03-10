const SEARCH = "queries/SEARCH";
const LOAD = "queries/LOAD";

export const searchQueries = (results) => {
  return {
    type: SEARCH,
    results,
  };
};

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
    default:
      return state;
  }
}
