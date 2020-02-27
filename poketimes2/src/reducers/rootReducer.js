const initState = {
  posts: [
    {
      body: "Dummy body 1",
      id: '1',
      title: "Dummy Title 1",
      userId: 1,
    },
    {
      body: "Dummy body 2",
      id: '2',
      title: "Dummy Title 2",
      userId: 2,
    },
    {
      body: "Dummy body 3",
      id: '3',
      title: "Dummy Title 3",
      userId: 3,
    }
  ]
}
const rootReducer = (state=initState, action) => {
  // console.log(action);
  if (action.type === 'DELETE_POST') {
    let newPosts = state.posts.filter(post => {
      return action.id !== post.id
    });
    return {
      ...state,
      posts: newPosts
    }
  }
  return state;
}

export default rootReducer;
