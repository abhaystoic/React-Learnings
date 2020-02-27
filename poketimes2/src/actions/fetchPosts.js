import axios from 'axios';

export const fetchPosts = () => {
  console.log('in fetchPosts...');
  return dispatch => {
    dispatch(fetchPostsPending());
    axios.get('https://jsonplaceholder.typicode.com/posts')
         .then(res => {
           let data = res.data.slice(0, 10);
           dispatch(fetchPostsSuccess(data));
           return data;
          })
          .catch(error => {
            dispatch(fetchPostsError());
          });
  }
}

export const FETCH_POSTS_PENDING = 'FETCH_POSTS_PENDING';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

function fetchPostsPending() {
    return {
        type: FETCH_POSTS_PENDING
    }
}

function fetchPostsSuccess(posts) {
    return {
        type: FETCH_POSTS_SUCCESS,
        posts: posts
    }
}

function fetchPostsError(error) {
    return {
        type: FETCH_POSTS_ERROR,
        error: error
    }
}
