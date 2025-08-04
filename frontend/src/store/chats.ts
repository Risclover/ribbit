/* =================================================================
   chat_threads slice
   ============================================================== */

/* ------------------------- ACTION TYPES ------------------------- */

const LOAD_CHAT_THREADS = "chat_threads/LOAD_CHAT_THREADS";
const LOAD_CHAT_THREAD = "chat_threads/LOAD_CHAT_THREAD";
const RECEIVE_NEW_MESSAGE = "chat_threads/RECEIVE_NEW_MESSAGE";
const THREAD_UNREAD_UPDATE = "chat_threads/THREAD_UNREAD_UPDATE";
const SET_UNREAD_TOTAL        = "chat_threads/SET_UNREAD_TOTAL";

/* ------------------------- ACTION CREATORS ---------------------- */
export const receiveNewMessage = (message) => ({
  type: RECEIVE_NEW_MESSAGE,
  payload: {
    threadId: message.threadId ?? message.thread_id,
    message,
  },
});

const loadChatThreads = (chatThreads) => ({
  type: LOAD_CHAT_THREADS,
  chatThreads,
});

const loadChatThread = (chatThread) => ({
  type: LOAD_CHAT_THREAD,
  chatThread,
});

export const threadUnreadUpdate = (threadId, hasUnread) => ({
  type: THREAD_UNREAD_UPDATE,
  payload: { threadId, hasUnread },
});

export const setUnreadTotal = (count: number) => ({
  type : SET_UNREAD_TOTAL,
  count,
});

/* ------------------------- THUNKS ------------------------------- */

/** Fetch *all* threads for the logged‑in user. */
export const getUserChatThreads = () => async (dispatch) => {
  const res = await fetch("/api/chat_threads");
  if (!res.ok) return;

  const data = await res.json();

  /* ------------------------------------------------------------
     Normalise whatever the server returns into a **flat array**.
     ------------------------------------------------------------ */
  const list = Array.isArray(data)
    ? data // already an array
    : Array.isArray(data.chatThreads)
    ? data.chatThreads // { chatThreads: [...] }
    : Array.isArray(data.ChatThreads)
    ? data.ChatThreads // { ChatThreads: [...] }
    : Object.values(data); // map keyed by id

  dispatch(loadChatThreads(list));
  return list;
};

/** Fetch a single thread (used after creating or opening a thread). */
export const getChatThread = (chatThreadId) => async (dispatch) => {
  const res = await fetch(`/api/chat_threads/${chatThreadId}`);
  if (!res.ok) return;
  const thread = await res.json();
  dispatch(loadChatThread(thread));
  return thread;
};

/** Create a new one‑to‑one thread and add it to the store. */
export const createChatThread = (receiverId) => async (dispatch) => {
  const res = await fetch("/api/chat_threads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receiverId }),
  });
  if (!res.ok) return;
  const thread = await res.json();
  dispatch(loadChatThread(thread));
  return thread;
};

/** Post a message inside an existing thread. */
export const createChatMessage =
  ({ content, receiverId, chatThreadId }) =>
  async () => {
    const res = await fetch(`/api/chat_threads/${chatThreadId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, receiver_id: receiverId }),
    });
    if (res.ok) return res.json();
    if (res.status < 500) return res.json(); // validation errors
    return ["An error occurred. Please try again."];
  };

/** Soft‑delete a message (mark as deleted for the current user). */
export const fakeDeleteMessage = (messageId) => async () => {
  const res = await fetch(`/api/chat_threads/messages/${messageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) return res.json();
};

/** Mark all messages in a thread as read. */
export const readAllChatMessages = (threadId) => async () => {
  const res = await fetch(`/api/chat_threads/${threadId}/read`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) return res.json();
};

/* ------------------------- REDUCER ------------------------------ */

type ChatSliceState = {
  loaded      : boolean;
  chatThreads : Record<number, any>;
  unreadTotal : number;
};

const initialState: ChatSliceState = {
  loaded      : false,
  chatThreads : {},
  unreadTotal : 0,
};

export default function chatThreadReducer(
  state = initialState,
  action: any,
): ChatSliceState {
  switch (action.type) {
    /* ---------- bulk load ---------- */
    case LOAD_CHAT_THREADS: {
      const byId: Record<number, any> = {};
      action.chatThreads.forEach((t) => {
        if (t && t.id != null) byId[t.id] = t;
      });

      const unreadTotal = Object.values(byId).filter((t: any) => t.hasUnread).length;
      return { ...state, chatThreads: byId, unreadTotal, loaded: true };
    }

    /* ---------- single thread added / refreshed ---------- */
    case LOAD_CHAT_THREAD: {
      const t = action.chatThread;
      const updated = { ...state.chatThreads, [t.id]: t };
      const unreadTotal = Object.values(updated).filter((th: any) => th.hasUnread).length;
      return { ...state, chatThreads: updated, unreadTotal };
    }

    /* ---------- new message pushed from socket ---------- */
    case RECEIVE_NEW_MESSAGE: {
      const { threadId, message } = action.payload;
      const thread = state.chatThreads[threadId];
      if (!thread) return state;

      const updatedThread = {
        ...thread,
        messages : [...(thread.messages ?? []), message],
      };

      const updated        = { ...state.chatThreads, [threadId]: updatedThread };
      /* do **NOT** mark unread here – let THREAD_UNREAD_UPDATE decide */
      return { ...state, chatThreads: updated };
    }

    /* ---------- unread flag toggled ---------- */
    case THREAD_UNREAD_UPDATE: {
      const { threadId, hasUnread } = action.payload;
      const thread = state.chatThreads[threadId];
      if (!thread) return state;

      const updatedThread = { ...thread, hasUnread };
      const updated       = { ...state.chatThreads, [threadId]: updatedThread };
      const unreadTotal   = Object.values(updated).filter((t: any) => t.hasUnread).length;

      return { ...state, chatThreads: updated, unreadTotal };
    }

    /* ---------- server told us outright ---------- */
    case SET_UNREAD_TOTAL:
      return { ...state, unreadTotal: action.count };

    default:
      return state;
  }
}

/* ------------------------- SELECTORS ---------------------------- */
export const selectChatThreads   = (s: any) => s.chatThreads.chatThreads;
export const selectUnreadTotal   = (s: any) => s.chatThreads.unreadTotal;
export const selectThreadById    = (id: number) => (s: any) => s.chatThreads.chatThreads[id];
