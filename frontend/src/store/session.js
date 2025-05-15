/* ------------------------- ACTIONS ------------------------- */

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const SET_LOADED = "session/SET_LOADED";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setLoaded = () => ({
  type: SET_LOADED,
});

/* ------------------------- THUNKS ------------------------- */

/**
 * Restore session (runs on initial page load or refresh)
 * Always dispatches SET_LOADED – even if the request fails –
 * so the UI knows the check is complete.
 */
export const authenticate = () => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/", {
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      if (!data.errors) dispatch(setUser(data));
    }
  } finally {
    dispatch(setLoaded()); // <-- mark “auth check finished”
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  }
  return ["An error occurred. Please try again."];
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) dispatch(removeUser());
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) return data.errors;
  }
  return ["An error occurred. Please try again."];
};

export const checkUsername = (username) => async () => {
  const response = await fetch(`/api/auth/signup/${username}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!response.ok) throw new Error("Error");
  return response;
};

export const checkEmail = (email) => async () => {
  const response = await fetch(`/api/auth/signup/${email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response;
};

/* ------------------------- REDUCER ------------------------- */

const initialState = { user: null, isLoaded: false };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case SET_LOADED:
      return { ...state, isLoaded: true };
    default:
      return state;
  }
}
