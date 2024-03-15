const LOAD = "favorite_users/LOAD";
const DELETE = "favorite_users/DELETE";

const load = (favoriteUsers) => {
  return {
    type: LOAD,
    favoriteUsers,
  };
};

const remove = (userId) => {
  return {
    type: DELETE,
    userId,
  };
};

export const getFavoriteUsers = () => async (dispatch) => {
  const response = await fetch("/api/favorite_users");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const addFavoriteUser = (userId) => async () => {
  const response = await fetch("/api/favorite_users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
    }),
  });
  return response;
};

export const removeFavoriteUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/favorite_users/${userId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const deletedMessage = await response.json();
    dispatch(remove(userId));
    return deletedMessage;
  }
};

const initialState = {};

export default function favoriteUsersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      if (action.favoriteUsers && action.favoriteUsers.users) {
        return action.favoriteUsers.users.reduce((users, user) => {
          users[user.id] = user;
          return users;
        }, {});
      } else {
        return state;
      }
    case DELETE:
      let removeState = { ...state };
      delete removeState[action.userId];
      return removeState;
    default:
      return state;
  }
}
