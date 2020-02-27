import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_PENDING } from "../actions/fetchPosts";

const initState = {
  posts: [],
  pending: false,
  error: null
}

const rootReducer = (state=initState, action) => {
  switch(action.type) {
    case 'DELETE_POST': {
      let newPosts = state.posts.filter(post => {
        return action.id !== post.id
      });
      return {
        ...state,
        posts: newPosts
      }
    }
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.posts,
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
export const getPosts = state => state.posts;
export const getPostsPending = state => state.pending;
export const getPostsError = state => state.error;
