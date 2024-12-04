const ADD_REACTION = "reactions/ADD";
const REMOVE_REACTION = "reactions/REMOVE";
const SET_REACTIONS = "reactions/SET";

export const addReaction = (reaction) => ({
  type: ADD_REACTION,
  reaction,
});

export const removeReaction = (reaction) => ({
  type: REMOVE_REACTION,
  reaction,
});

const setReactions = (reactions) => ({
  type: SET_REACTIONS,
  reactions,
});

export const createReaction = (payload) => async (dispatch) => {
  const { messageId, reactionType } = payload;
  const response = await fetch(`/api/chat_reactions/messages/${messageId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reaction: reactionType }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addReaction(data));
    return data;
  }
};

export const deleteReaction = (payload) => async (dispatch) => {
  const { messageId, reactionType } = payload;
  const response = await fetch(`/api/chat_reactions/messages/${messageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reaction: reactionType }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeReaction(data));
    return data;
  }
};

export const fetchReactions = () => async (dispatch) => {
  const response = await fetch("/api/chat_reactions");
  if (response.ok) {
    const data = await response.json();
    dispatch(setReactions(data.reactions));
  }
};

export const fetchReactionsForMessage = (messageId) => async (dispatch) => {
  const response = await fetch(`/api/chat_reactions/messages/${messageId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(setReactions(data.reactions));
  } else {
    // Handle errors if needed
    console.error("Failed to fetch reactions");
  }
};

const initialState = {};

const reactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REACTION: {
      const reaction = action.reaction;
      const messageId = reaction.messageId;
      const reactionType = reaction.reactionType;

      const newState = { ...state };

      if (!newState[messageId]) {
        newState[messageId] = [];
      }

      // Find existing reaction data
      let reactionData = newState[messageId].find(
        (r) => r.reactionType === reactionType
      );

      if (!reactionData) {
        // Create new reaction data
        reactionData = {
          reactionType: reactionType,
          count: 0,
          users: [],
        };
        newState[messageId].push(reactionData);
      }

      if (!reactionData.users.includes(reaction.userId)) {
        reactionData.count += 1;
        reactionData.users.push(reaction.userId);
      }

      return newState;
    }

    case REMOVE_REACTION: {
      const reaction = action.reaction;
      const messageId = reaction.messageId;
      const reactionType = reaction.reactionType;

      const newState = { ...state };

      if (newState[messageId]) {
        const reactionData = newState[messageId].find(
          (r) => r.reactionType === reactionType
        );

        if (reactionData && reactionData.users.includes(reaction.userId)) {
          reactionData.count -= 1;
          reactionData.users = reactionData.users.filter(
            (userId) => userId !== reaction.userId
          );

          // Remove reactionData if count reaches zero
          if (reactionData.count === 0) {
            newState[messageId] = newState[messageId].filter(
              (r) => r.reactionType !== reactionType
            );
          }

          // Remove messageId from state if no reactions left
          if (newState[messageId].length === 0) {
            delete newState[messageId];
          }
        }
      }

      return newState;
    }

    case SET_REACTIONS: {
      const newState = { ...state };

      action.reactions.forEach((reaction) => {
        const messageId = reaction.messageId;
        const reactionType = reaction.reactionType;

        if (!newState[messageId]) {
          newState[messageId] = [];
        }

        // Find existing reaction data for this reactionType
        let reactionData = newState[messageId].find(
          (r) => r.reactionType === reactionType
        );

        if (!reactionData) {
          // If it doesn't exist, create a new one
          reactionData = {
            reactionType: reactionType,
            count: 0,
            users: [],
          };
          newState[messageId].push(reactionData);
        }

        // Check if the user has already reacted with this reactionType
        if (!reactionData.users.includes(reaction.userId)) {
          reactionData.count += 1;
          reactionData.users.push(reaction.userId);
        }
      });

      return newState;
    }
    default:
      return state;
  }
};

export default reactionsReducer;
