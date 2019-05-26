const {
  RECEIVE_COLLECTED_POSTS,
  ADD_COLLECTED_POSTS
} = require('../../constants/index')

const loadCollectedPosts = (state, { cursor, data }) => ({
  [cursor]: data.map(item => item.id)
})

const addCollectedPosts = (state, { cursor, data }) => ({
  ...state,
  [cursor]: data.map(item => item.id)
})

const collectedPosts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COLLECTED_POSTS:
      return loadCollectedPosts(state, action)
    case ADD_COLLECTED_POSTS:
      return addCollectedPosts(state, action)
    default:
      return state
  }
}

module.exports = collectedPosts
