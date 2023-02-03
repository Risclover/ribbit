const LOAD_USERS = "users/LOAD_USERS";
const LOAD_USER = "users/LOAD_USER";

const loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
  };
};

const loadUser = (user) => {
  return {
    type: LOAD_USER,
    user,
  };
};

export const getUsers = () => async (dispatch) => {
  const response = await fetch("/api/users");

  if (response.ok) {
    const users = await response.json();
    dispatch(loadUsers(users));
    return users;
  }
};

export const editProfile = (id, payload) => async (dispatch) => {
  const { display_name, about } = payload;
  console.log("DISPLAY_NAME", display_name);
  console.log("ABOUT", about);
  const response = await fetch(`/api/users/${id}/profile/edit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      display_name,
      about,
    }),
  });

  console.log(response);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadUser(data));
    return data;
  }
  const data = await response.json();
  return data;
};

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users.Users.reduce((users, user) => {
        users[user.id] = user;
        return users;
      }, {});
    case LOAD_USER:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;
  }
}
