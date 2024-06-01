const LOAD_CHAT_THREADS = "chat_threads/LOAD_CHAT_THREADS";
const LOAD_CHAT_THREAD = "chat_threads/LOAD_CHAT_THREAD";

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

export const createReaction = (payload) => async (dispatch) => {
  const { messageId, emoji } = payload;

  const response = await fetch(
    `/api/chat_threads/messages/${messageId}/reactions`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emoji }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

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

    default:
      return state;
  }
}
