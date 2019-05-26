const {
  RECEIVE_MINE_POSTS,
  ADD_MINE_POSTS
} = require('../../constants/index')

const loadMinePosts = (state, { cursor, data }) => ({
  [cursor]: data.map(item => item.id)
})

const addMinePosts = (state, { cursor, data }) => ({
  ...state,
  [cursor]: data.map(item => item.id)
})

const minePosts = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MINE_POSTS:
      return loadMinePosts(state, action)
    case ADD_MINE_POSTS:
      return addMinePosts(state, action)
    default:
      return state
  }
}

module.exports = minePosts
