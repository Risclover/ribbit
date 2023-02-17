const LOAD_MESSAGES = "messages/LOAD_MESSAGES";
const LOAD_MESSAGE = "messages/LOAD_MESSAGE";
const SEND_MESSAGE = "messages/ADD";

const createMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    message,
  };
};

const loadMessage = (message) => {
  return {
    type: LOAD_MESSAGE,
    message,
  };
};

const loadMessages = (messages) => {
  return {
    type: LOAD_MESSAGES,
    messages,
  };
};

export const getMessages = (id) => async (dispatch) => {
  console.log(id);
  const response = await fetch(`/api/messages/${id}`);
  if (response.ok) {
    const messages = await response.json();
    console.log("MeSages", messages);
    dispatch(loadMessages(messages));
    return messages;
  }
};

export const sendMessage = (payload, recipientId) => async (dispatch) => {
  const { body } = payload;
  const response = await fetch(`/api/messages/send/${recipientId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body,
    }),
  });

  if (response.ok) {
    const message = await response.json();
    console.log("meSSAGE", message);
    dispatch(loadMessage(message));
    return message;
  }
};

const initialState = {};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MESSAGES:
      console.log("ACTION", action);
      console.log("AAAAction", action.messages.messages, "action mm");
      return action.messages.Messages.reduce((messages, message) => {
        messages[message.id] = message;
        return messages;
      }, {});
    case LOAD_MESSAGE:
      return {
        ...state,
        [action.message.id]: { ...action.message },
      };
    default:
      return state;
  }
}
