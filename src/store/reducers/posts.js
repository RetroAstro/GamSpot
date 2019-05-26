const { combineReducers } = require('../../lib/redux')

const {
  RECEIVE_POPULAR_POSTS,
  ADD_POPULAR_POSTS,
  RECEIVE_SINGLE_POSTS,
  ADD_SINGLE_POSTS,
  RECEIVE_SOLE_POST,
  LIKE_ACTION,
  COLLECT_ACTION,
  RECEIVE_MINE_POSTS,
  ADD_MINE_POSTS,
  RECEIVE_LIKED_POSTS,
  ADD_LIKED_POSTS,
  RECEIVE_COLLECTED_POSTS,
  ADD_COLLECTED_POSTS
} = require('../constants/index')

const loadPosts = (state, { data }) => {
  let middle = data
    .map(item => ({ [item.id]: item }))
    .reduce((prev, next) => ({ ...prev, ...next }), {})

  return {
    ...state,
    ...middle
  }
}

const updateSolePost = (state, { data: { post } }) => {
  let result = {
    ...state,
    [post.id]: {
      ...state[post.id],
      commitCount: post.commitCount
    }
  }

  return result
}

const updateLikeStatus = (state, { id, isAgree }) => {
  let result = {
    ...state,
    [id]: {
      ...state[id],
      isAgree: !isAgree,
      agreeCount: isAgree ? state[id].agreeCount - 1 : state[id].agreeCount + 1
    }
  }

  return result
}

const updateCollectStatus = (state, { id, isCollection }) => {
  let result = {
    ...state,
    [id]: {
      ...state[id],
      isCollection: !isCollection,
      collectionCount: isCollection ? state[id].collectionCount - 1 : state[id].collectionCount + 1
    }
  }

  return result
}

const postsById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_POPULAR_POSTS:
    case ADD_POPULAR_POSTS:
    case RECEIVE_SINGLE_POSTS:
    case ADD_SINGLE_POSTS:
    case RECEIVE_MINE_POSTS:
    case ADD_MINE_POSTS:
    case RECEIVE_LIKED_POSTS:
    case ADD_LIKED_POSTS:
    case RECEIVE_COLLECTED_POSTS:
    case ADD_COLLECTED_POSTS:
      return loadPosts(state, action)
    case RECEIVE_SOLE_POST:
      return updateSolePost(state, action)
    case LIKE_ACTION:
      return updateLikeStatus(state, action)
    case COLLECT_ACTION:
      return updateCollectStatus(state, action)
    default:
      return state
  }
}

module.exports = combineReducers({ byId: postsById })
