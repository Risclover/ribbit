/* ------------------------- ACTIONS ------------------------- */

const LOAD_CHAT_THREADS = "chat_threads/LOAD_CHAT_THREADS";
const LOAD_CHAT_THREAD = "chat_threads/LOAD_CHAT_THREAD";
const RECEIVE_NEW_MESSAGE = "chat_threads/RECEIVE_NEW_MESSAGE";
const THREAD_UNREAD_UPDATE = "chat_threads/THREAD_UNREAD_UPDATE";

export const receiveNewMessage = (message) => {
  return {
    type: RECEIVE_NEW_MESSAGE,
    payload: {
      threadId: message.threadId || message.thread_id,
      message: message,
    },
  };
};

const loadChatThreads = (chatThreads) => {
  return {
    type: LOAD_CHAT_THREADS,
    chatThreads,
  };
};

const loadChatThread = (chatThread) => {
  return {
    type: LOAD_CHAT_THREAD,
    chatThread,
  };
};

export const threadUnreadUpdate = (threadId, hasUnread) => ({
  type: THREAD_UNREAD_UPDATE,
  payload: { threadId, hasUnread },
});

/* ------------------------- THUNKS ------------------------- */

export const getUserChatThreads = () => async (dispatch) => {
  const response = await fetch("/api/chat_threads");

  if (response.ok) {
    const data = await response.json();
    dispatch(loadChatThreads(data));
    return data;
  }
};

export const getChatThread = (chatThreadId) => async (dispatch) => {
  const response = await fetch(`/api/chat_threads/${chatThreadId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(loadChatThread(data));
    return data;
  }
};

export const createChatThread = (receiverId) => async (dispatch) => {
  const response = await fetch("/api/chat_threads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receiverId: receiverId }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(loadChatThread(data)); // Dispatch action to add the new thread to Redux store

    return data;
  }
};

export const createChatMessage = (payload) => async (dispatch) => {
  const { content, receiverId, chatThreadId } = payload;
  const response = await fetch(`/api/chat_threads/${chatThreadId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: content,
      receiver_id: receiverId,
    }),
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

export const fakeDeleteMessage = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/chat_threads/messages/${messageId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();

    return data;
  }
};

export const readAllChatMessages = (threadId) => async (dispatch) => {
  const response = await fetch(`/api/chat_threads/${threadId}/read`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

/* ------------------------- REDUCER ------------------------- */

const initialState = {};

export default function chatThreadReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHAT_THREADS:
      if (action.chatThreads && action.chatThreads.ChatThreads) {
        return action.chatThreads.ChatThreads.reduce(
          (chatThreads, chatThread) => {
            chatThreads[chatThread.id] = chatThread;
            return chatThreads;
          },
          {}
        );
      }
      return state;

    case LOAD_CHAT_THREAD:
      return { ...state, [action.chatThread.id]: action.chatThread };

    case RECEIVE_NEW_MESSAGE:
      const { threadId, message } = action.payload;
      return {
        ...state,
        [threadId]: {
          ...state[threadId],
          messages: [...(state[threadId]?.messages || []), message],
        },
      };

    case THREAD_UNREAD_UPDATE: {
      const { threadId, hasUnread } = action.payload;
      const existingThread = state[threadId];
      if (!existingThread) return state; // if we haven't loaded that thread yet, skip

      return {
        ...state,
        [threadId]: {
          ...existingThread,
          hasUnread, // boolean
        },
      };
    }

    default:
      return state;
  }
}
