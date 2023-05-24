const LOAD = "notifications/LOAD";
const LOAD_SINGLE = "notifications/LOAD_SINGLE";
const DELETE = "notifications/DELETE";

const load = (notifications) => {
  return {
    type: LOAD,
    notifications,
  };
};

const loadSingle = (notification) => {
  return {
    type: LOAD_SINGLE,
    notification,
  };
};

const removeNotification = (notificationId) => {
  return {
    type: DELETE,
    notificationId,
  };
};

export const getUserNotifications = (userId) => async (dispatch) => {
  const response = await fetch(`/api/notifications/user/${userId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const getAllNotifications = () => async (dispatch) => {
  const response = await fetch("/api/notifications");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

export const addNotification = (payload) => async (dispatch) => {
  const { type, id } = payload;

  const response = await fetch(`/api/notifications/${type}/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadSingle(data));
    return data;
  }
};

export const readNotification = (notificationId) => async () => {
  const response = await fetch(`/api/notifications/${notificationId}/read`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const readAllMessageNotifications = () => async () => {
  const response = await fetch("/api/notifications/read", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const readAllNotifications = () => async () => {
  const response = await fetch("/api/notifications/read-all", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const unreadNotification = (notificationId) => async () => {
  const response = await fetch(`/api/notifications/${notificationId}/unread`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const deleteNotification = (notificationId) => async (dispatch) => {
  const response = await fetch(`/api/notifications/${notificationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const deleted = await response.json();
    dispatch(removeNotification(notificationId));
    return deleted;
  }
};

const initialState = {};

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return action.notifications.Notifications.reduce(
        (notifications, notification) => {
          notifications[notification.id] = notification;
          return notifications;
        },
        {}
      );
    case LOAD_SINGLE:
      return {
        ...state,
        [action.notification.id]: { ...action.notification },
      };
    case DELETE:
      let removeState = { ...state };
      delete removeState[action.notificationId];
      return removeState;
    default:
      return state;
  }
}
