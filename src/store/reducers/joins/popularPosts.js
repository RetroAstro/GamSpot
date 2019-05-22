const {
  RECEIVE_POPULAR_POSTS,
  ADD_POPULAR_POSTS
} = require('../../constants/index')

const loadPopularPosts = (state, { cursor, data }) => ({
  [cursor]: data.map(item => item.id)
})

const addPopularPosts = (state, { cursor, data }) => ({
  ...state,
  [cursor]: data.map(item => item.id)
})

const popularPosts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POPULAR_POSTS:
      return loadPopularPosts(state, action)
    case ADD_POPULAR_POSTS:
      return addPopularPosts(state, action)
    default:
      return state
  }
}

module.exports = popularPosts
