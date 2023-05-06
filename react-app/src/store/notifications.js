import { request } from "http";

const LOAD = "notifications/LOAD";
const LOAD_SINGLE = "notifications/LOAD_SINGLE";

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

export const readNotification = (notificationId) => async (dispatch) => {
  const response = await fetch(`/api/notifications/${notificationId}/read`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const readAllNotifications = () => async (dispatch) => {
  const response = await fetch("/api/notifications/read", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const unreadNotification = (notificationId) => async (dispatch) => {
  const response = await fetch(`/api/notifications/${notificationId}/unread`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
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
    default:
      return state;
  }
}
