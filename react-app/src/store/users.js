const LOAD_USERS = "users/LOAD";

const loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users,
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

const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return action.users.Users.reduce((users, user) => {
        users[user.id] = user;
        return users;
      }, {});
    default:
      return state;
  }
}
