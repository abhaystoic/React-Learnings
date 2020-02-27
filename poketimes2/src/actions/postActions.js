export const DELETE_POST = 'DELETE_POST';

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    id: id,
  }
}