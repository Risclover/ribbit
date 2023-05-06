const LOAD = "threads/LOAD";
const LOAD_ONE = "threads/LOAD_ONE";

const loadThreads = (threads) => {
  return {
    type: LOAD,
    threads,
  };
};

const loadThread = (thread) => {
  return {
    type: LOAD_ONE,
    thread,
  };
};

export const getThreads = () => async (dispatch) => {
  const response = await fetch("/api/threads");
  if (response.ok) {
    const data = await response.json();
    dispatch(loadThreads(data));
    return data;
  }
};

export const getThread = (threadId) => async (dispatch) => {
  const response = await fetch(`/api/threads/${threadId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadThread(data));
    return data;
  }
};

export const createThread = (payload) => async (dispatch) => {
  const { receiverId, subject } = payload;
  const response = await fetch("/api/threads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receiverId: receiverId, subject: subject }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const createMessage = (payload) => async (dispatch) => {
  const { content, threadId, receiverId } = payload;
  const response = await fetch(`/api/threads/${threadId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: content, receiverId: receiverId }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const readMessage = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/threads/${messageId}/read`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const unreadMessage = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/threads/${messageId}/unread`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const readAllMessages = () => async (dispatch) => {
  const response = await fetch("/api/threads", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

const initialState = {};

export default function threadsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return action.threads.Threads.reduce((threads, thread) => {
        threads[thread.id] = thread;
        return threads;
      }, {});
    case LOAD_ONE:
      return { ...state, [action.thread.id]: { ...action.thread } };
    default:
      return state;
  }
}
