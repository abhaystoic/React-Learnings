export const deletePost = (id) => {
  return {
    type: 'DELETE_POST',
    id: id,
  }
}

export const fetchPosts = () => {
  return {
    type: 'FETCH_POST'
  }
}