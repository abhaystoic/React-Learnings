import axios from 'axios';

export const fetchPosts = (numberOfPosts, totalPages) => {
  console.log('in fetchPosts...', numberOfPosts, totalPages);
  return dispatch => {
    dispatch(fetchPostsPending());
    axios.get('https://jsonplaceholder.typicode.com/posts')
         .then(res => {
           let data = res.data.slice(0, numberOfPosts);
           setTimeout(() => {
            dispatch(fetchPostsSuccess(data, totalPages));
           }, 500);
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

function fetchPostsSuccess(posts, totalPages) {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: {
          posts: posts,
          scrolling: false,
          totalPages: totalPages,
        },
    }
}

function fetchPostsError(error) {
    return {
        type: FETCH_POSTS_ERROR,
        error: error
    }
}
