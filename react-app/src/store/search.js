const SEARCH_ALL = "search/SEARCH_ALL";
const SEARCH_POSTS = "search/SEARCH_POSTS";
const SEARCH_COMMENTS = "search/SEARCH_COMMENTS";
const SEARCH_USERS = "search/SEARCH_USERS";
const SEARCH_COMMUNITIES = "search/SEARCH_COMMUNITIES";

export const searchQueries = (results) => {
  return {
    type: SEARCH_ALL,
    results,
  };
};

export const getPostResults = (postResults) => {
  return {
    type: SEARCH_POSTS,
    payload: postResults,
  };
};

export const getCommentResults = (commentResults) => {
  return {
    type: SEARCH_COMMENTS,
    payload: commentResults,
  };
};

export const getUserResults = (userResults) => {
  return {
    type: SEARCH_USERS,
    payload: userResults,
  };
};

export const getCommunityResults = (communityResults) => {
  return {
    type: SEARCH_COMMUNITIES,
    payload: communityResults,
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
  const response = await fetch(`/api/search/query?q=${formattedQuery}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(searchQueries(data));
    return data;
  }
};

export const searchPosts = (query) => async (dispatch) => {
  const response = await fetch(
    `/api/search/posts?q=${encodeURIComponent(query)}`
  );

  if (response.ok) {
    const data = await response.json();
    dispatch(getPostResults(data));
    return data;
  }
};

export const searchComments = (query) => async (dispatch) => {
  const response = await fetch(
    `/api/search/comments?q=${encodeURIComponent(query)}`
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getCommentResults(data));
    return data;
  }
};

export const searchUsers = (query) => async (dispatch) => {
  const response = await fetch(
    `/api/search/users?q=${encodeURIComponent(query)}`
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getUserResults(data));
    return data;
  }
};

export const searchCommunities = (query) => async (dispatch) => {
  const response = await fetch(
    `/api/search/communities?q=${encodeURIComponent(query)}`
  );
  if (response.ok) {
    const data = await response.json();
    dispatch(getCommunityResults(data));
    return data;
  }
};

const initialState = {};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_ALL:
      return action.results.query.reduce((results, result) => {
        results[result.id] = result;
        return results;
      }, {});
    case SEARCH_POSTS:
      return action.payload.PostResults.reduce((results, result) => {
        results[result.id] = result;
        return results;
      }, {});
    case SEARCH_COMMENTS:
      return action.payload.CommentResults.reduce((results, result) => {
        results[result.id] = result;
        return results;
      }, {});
    case SEARCH_USERS:
      return action.payload.UserResults.reduce((results, result) => {
        results[result.id] = result;
        return results;
      }, {});
    case SEARCH_COMMUNITIES:
      return action.payload.CommunityResults.reduce((results, result) => {
        results[result.id] = result;
        return results;
      }, {});
    default:
      return state;
  }
}
