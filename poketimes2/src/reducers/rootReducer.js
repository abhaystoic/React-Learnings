import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_PENDING } from "../actions/fetchPosts";
import { DELETE_POST } from "../actions/postActions";


const initState = {
  pending: false,
  error: null,
  payload: {
    scrolling: false,
    totalPages: 1,
    posts: [],
  },
}

const rootReducer = (state=initState, action) => {
  switch(action.type) {
    case DELETE_POST: {
      let newPayload = state.payload;
      let newPosts = state.payload.posts.filter(post => {
        return action.id !== post.id
      });
      newPayload.posts = newPosts;
      return {
        ...state,
        payload: newPayload
      }
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        payload: action.payload,
      }
    }
    case FETCH_POSTS_ERROR: {
      return {
          ...state,
          pending: false,
          error: action.error
      }
    }
    case FETCH_POSTS_PENDING: {
      return {
          ...state,
          pending: true
      }
    }
    default: return state;
  }
}

// Reducer.
export default rootReducer;
// Selectors.
export const getPayload = state => state.payload;
export const getPostsPending = state => state.pending;
export const getPostsError = state => state.error;
