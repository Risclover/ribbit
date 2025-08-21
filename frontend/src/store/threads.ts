import { useAppSelector } from "./hooks";

/* ------------------------- ACTIONS ------------------------- */
const LOAD = "threads/LOAD";
const LOAD_ONE = "threads/LOAD_ONE";
const DELETE = "threads/DELETE";
const SET_UNREAD_TOTAL = "threads/SET_UNREAD_TOTAL";
const START_LOADING = "threads/START_LOADING";
const FINISH_LOADING = "threads/FINISH_LOADING";

const startLoading = () => ({ type: START_LOADING });
const finishLoading = () => ({ type: FINISH_LOADING });

const loadThreads = (threads: any) => ({ type: LOAD, threads });
const loadThread = (thread: any) => ({ type: LOAD_ONE, thread });
export const deleteThread = (threadId: number) => ({ type: DELETE, threadId });
export const setThreadsUnreadTotal = (count: number) => ({
  type: SET_UNREAD_TOTAL,
  count,
});

/* ------------------------- THUNKS ------------------------- */
export const getThreads = () => async (dispatch: any, getState: any) => {
  const { threads } = getState(); // slice name
  if (threads.loading || threads.loaded) return; // guard against loops

  dispatch(startLoading());
  try {
    const res = await fetch("/api/threads");
    if (!res.ok) return;
    const data = await res.json();
    dispatch(loadThreads(data));
  } finally {
    dispatch(finishLoading());
  }
};

export const getThread = (threadId: number) => async (dispatch: any) => {
  const res = await fetch(`/api/threads/${threadId}`);
  if (!res.ok) return;
  const data = await res.json();
  dispatch(loadThread(data));
  return data;
};

export const createThread = (payload) => async () => {
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

export const createMessage = (payload) => async () => {
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

export const readMessage = (messageId) => async () => {
  const response = await fetch(`/api/threads/${messageId}/read`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const unreadMessage = (messageId) => async () => {
  const response = await fetch(`/api/threads/${messageId}/unread`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const readAllMessages = () => async () => {
  const response = await fetch("/api/threads", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const expandCollapseThread = (threadId) => async () => {
  const response = await fetch(`/api/threads/${threadId}/expandstate`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const deleteMessage = (messageId) => async () => {
  const response = await fetch(`/api/threads/${messageId}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application-json" },
  });

  if (response.ok) {
    const msg = await response.json();
    return msg;
  }
};

export const removeThread = (threadId) => async (dispatch) => {
  const response = await fetch(`/api/threads/${threadId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const msg = await response.json();
    dispatch(deleteThread(threadId));
    return msg;
  }
};

/* ------------------------- REDUCER ------------------------- */

/* ----------------- state ----------------- */
type ThreadsState = {
  threads: Record<number, any>; // map: id -> thread
  loading: boolean;
  loaded: boolean;
  unreadTotal: number;
};

const initialState: ThreadsState = {
  threads: {},
  loading: false,
  loaded: false,
  unreadTotal: 0,
};

/* ----------------- reducer ----------------- */
export default function threadsReducer(
  state: ThreadsState = initialState,
  action: any
): ThreadsState {
  switch (action.type) {
    case START_LOADING:
      return { ...state, loading: true };

    case FINISH_LOADING:
      return { ...state, loading: false, loaded: true };

    case LOAD: {
      // action.threads is the API payload: { Threads: [...] }
      const map = (action.threads?.Threads ?? []).reduce(
        (acc: Record<number, any>, t: any) => {
          if (t && t.id != null) acc[t.id] = t;
          return acc;
        },
        {}
      );
      return { ...state, threads: map };
    }

    case LOAD_ONE: {
      const t = action.thread;
      return { ...state, threads: { ...state.threads, [t.id]: t } };
    }

    case DELETE: {
      const next = { ...state.threads };
      delete next[action.threadId as number];
      return { ...state, threads: next };
    }

    case SET_UNREAD_TOTAL:
      return { ...state, unreadTotal: action.count ?? 0 };

    default:
      return state;
  }
}

export const selectThreadsMap = (s: any) => s.threads.threads;
export const selectMessageThreadById = (id: number) => (s: any) =>
  s.threads.threads[id];
