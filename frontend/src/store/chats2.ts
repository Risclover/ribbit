/* ------------------------- ACTIONS ------------------------- */

const LOAD_THREADS = "chat2/LOAD_THREADS";
const ADD_THREAD = "chat2/ADD_THREAD";
const UPDATE_THREAD = "chat2/UPDATE_THREAD";
const SET_LOADING = "chat2/SET_LOADING";

/* ---------- Action-creator helpers (left-nav focused) ---------- */

const loadThreads = (threads) => ({
  type: LOAD_THREADS,
  threads, // array of thread DTOs
});

const addThread = (thread) => ({
  type: ADD_THREAD,
  thread, // newly created thread
});

const updateThread = (thread) => ({
  type: UPDATE_THREAD,
  thread, // thread with fresh lastMessage / timestamp
});

const setLoading = (loading) => ({
  type: SET_LOADING,
  loading,
});

/* --------------------------- THUNKS --------------------------- */

/** Hydrate the ChatNav list on page-load or refresh */
export const get2Threads = () => async (dispatch) => {
  dispatch(setLoading(true));

  const res = await fetch("/api/chat2/threads");
  if (res.ok) {
    const data = await res.json(); // array of threads
    dispatch(loadThreads(data));
    dispatch(setLoading(false));
    return data;
  }

  dispatch(setLoading(false));
  return await res.json(); // propagate server error
};

/** Optimistically update the nav list when a socket event arrives */
export const socketUpdateThread = (thread) => (dispatch) => {
  dispatch(updateThread(thread));
};

/* -------------------------- REDUCER --------------------------- */

interface ChatNavState {
  threadsById: { [id: number]: any };
  threadOrder: number[]; // sorted DESC by lastMessage.timestamp
  loading: boolean;
}

const initialState: ChatNavState = {
  threadsById: {},
  threadOrder: [],
  loading: false,
};

const chat2Reducer = (state = initialState, action) => {
  switch (action.type) {
    /* ---------- Bulk load (initial hydration) ---------- */
    case LOAD_THREADS: {
      const next: ChatNavState = {
        threadsById: {},
        threadOrder: [],
        loading: false,
      };

      action.threads.forEach((t) => {
        next.threadsById[t.id] = t;
        next.threadOrder.push(t.id);
      });

      return next;
    }

    /* ---------- New thread locally created ---------- */
    case ADD_THREAD: {
      const newThreadsById = {
        ...state.threadsById,
        [action.thread.id]: action.thread,
      };
      const newOrder = [action.thread.id, ...state.threadOrder];
      return { ...state, threadsById: newThreadsById, threadOrder: newOrder };
    }

    /* ---------- Existing thread got new message ---------- */
    case UPDATE_THREAD: {
      // replace data & bump to top of order
      const newThreadsById = {
        ...state.threadsById,
        [action.thread.id]: action.thread,
      };
      const newOrder = [
        action.thread.id,
        ...state.threadOrder.filter((id) => id !== action.thread.id),
      ];
      return { ...state, threadsById: newThreadsById, threadOrder: newOrder };
    }

    /* ---------- UI helper ---------- */
    case SET_LOADING:
      return { ...state, loading: action.loading };

    default:
      return state;
  }
};

export default chat2Reducer;
