const LOAD = "messages/LOAD";

const load = (messages) => {
  return {
    type: LOAD,
    messages,
  };
};

export const getMessages = () => async (dispatch) => {
  const response = await fetch("/api/messages");
  if (response.ok) {
    const data = await response.json();
    dispatch(load(data));
    return data;
  }
};

const initialState = {};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return action.messages.Messages.reduce((messages, message) => {
        messages[message.id] = message;
        return messages;
      }, {});
    default:
      return state;
  }
}
