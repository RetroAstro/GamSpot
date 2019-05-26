const {
  RECEIVE_LIKED_POSTS,
  ADD_LIKED_POSTS
} = require('../../constants/index')

const loadLikedPosts = (state, { cursor, data }) => ({
  [cursor]: data.map(item => item.id)
})

const addLikedPosts = (state, { cursor, data }) => ({
  ...state,
  [cursor]: data.map(item => item.id)
})

const likedPosts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LIKED_POSTS:
      return loadLikedPosts(state, action)
    case ADD_LIKED_POSTS:
      return addLikedPosts(state, action)
    default:
      return state
  }
}

module.exports = likedPosts
