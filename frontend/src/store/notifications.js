// Action Types
const LOAD_NOTIFICATIONS = "notifications/LOAD_NOTIFICATIONS";
const ADD_NOTIFICATION = "notifications/ADD_NOTIFICATION";
const MARK_READ = "notifications/MARK_READ";
const MARK_UNREAD = "notifications/MARK_UNREAD";
const MARK_ALL_READ = "notifications/MARK_ALL_READ";
const DELETE_NOTIFICATION = "notifications/DELETE_NOTIFICATION";
const DELETE_ALL_NOTIFICATIONS = "notifications/DELETE_ALL_NOTIFICATIONS";
const SET_SEEN_ALL = "notifications/SET_SEEN_ALL";

// Action Creators
export const loadNotifications = (notifications) => ({
  type: LOAD_NOTIFICATIONS,
  notifications,
});

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  notification,
});

export const markNotificationReadAction = (notificationId) => ({
  type: MARK_READ,
  notificationId,
});

export const markNotificationUnreadAction = (notificationId) => ({
  type: MARK_UNREAD,
  notificationId,
});

export const markAllNotificationsReadAction = (notifications) => ({
  type: MARK_ALL_READ,
  notifications,
});

export const deleteNotificationAction = (notificationId) => ({
  type: DELETE_NOTIFICATION,
  notificationId,
});

export const deleteAllNotificationsAction = () => ({
  type: DELETE_ALL_NOTIFICATIONS,
});

export const setSeenAll = () => ({ type: SET_SEEN_ALL });

// Thunks
export const fetchNotifications = () => async (dispatch) => {
  const res = await fetch("/api/notifications");
  if (res.ok) {
    const data = await res.json();
    dispatch(loadNotifications(data.notifications));
  }
};

// This one can remain if you want a minimal “mark read” endpoint
export const markNotificationRead = (notificationId) => async (dispatch) => {
  const res = await fetch(`/api/notifications/${notificationId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    dispatch(markNotificationReadAction(notificationId));
  }
};

// OR if you want a route that returns the updated notification in JSON
export const readNotification = (notificationId) => async (dispatch) => {
  // FIX the typo "notificatins" -> "notifications"
  const res = await fetch(`/api/notifications/${notificationId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    // data should contain the updated notification
    dispatch(markNotificationReadAction(data.id));
    return data;
  }
};

export const unreadNotification = (notificationId) => async (dispatch) => {
  const res = await fetch(`/api/notifications/${notificationId}/unread`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(markNotificationUnreadAction(data.id));
    return data;
  }
};

export const readAllNotifications = () => async (dispatch) => {
  // Make sure your backend route is "/api/notifications/read_all"
  // or "/read-all" — match whatever you have
  const res = await fetch(`/api/notifications/read_all`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(markAllNotificationsReadAction(data.notifications));
  }
};

export const deleteNotification = (notificationId) => async (dispatch) => {
  const res = await fetch(`/api/notifications/${notificationId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    // often returns {"message": "Notification deleted"} or something
    await res.json();
    dispatch(deleteNotificationAction(notificationId));
  }
};

export const deleteAllNotifications = () => async (dispatch) => {
  const res = await fetch("/api/notifications", {
    method: "DELETE",
  });
  if (res.ok) {
    await res.json();
    dispatch(deleteAllNotificationsAction());
  }
};

export const markAllSeen = () => async (dispatch) => {
  const res = await fetch("/api/notifications/seen", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    await res.json();
    dispatch(setSeenAll());
  }
};

// Reducer
const initialState = {};

export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATIONS: {
      const newState = {};
      action.notifications.forEach((n) => {
        newState[n.id] = n;
      });
      return newState;
    }

    case ADD_NOTIFICATION: {
      return {
        ...state,
        [action.notification.id]: action.notification,
      };
    }

    case MARK_READ: {
      const newState = { ...state };
      if (newState[action.notificationId]) {
        newState[action.notificationId] = {
          ...newState[action.notificationId],
          isRead: true,
        };
      }
      return newState;
    }

    case MARK_UNREAD: {
      // We changed the action to have `notificationId`
      const newState = { ...state };
      if (newState[action.notificationId]) {
        newState[action.notificationId] = {
          ...newState[action.notificationId],
          isRead: false,
        };
      }
      return newState;
    }

    case MARK_ALL_READ: {
      // Overwrite entire store with the updated notifications
      const newState = {};
      action.notifications.forEach((notif) => {
        newState[notif.id] = notif;
      });
      return newState;
    }

    case DELETE_NOTIFICATION: {
      // We changed the action to have `notificationId`
      const newState = { ...state };
      delete newState[action.notificationId];
      return newState;
    }

    case DELETE_ALL_NOTIFICATIONS: {
      // Returns an empty object
      return {};
    }

    case SET_SEEN_ALL: {
      const next = {};
      for (const id in state) {
        next[id] = { ...state[id], isSeen: true };
      }
      return next;
    }

    default:
      return state;
  }
}
