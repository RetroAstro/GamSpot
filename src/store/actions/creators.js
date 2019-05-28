const {
  RECEIVE_CIRCLES,
  RECEIVE_SOLE_CIRCLE,
  RECEIVE_POPULAR_POSTS,
  ADD_POPULAR_POSTS,
  RECEIVE_SINGLE_POSTS,
  ADD_SINGLE_POSTS,
  JOIN_CIRCLE,
  PUBLISH_NEW_POST,
  RECEIVE_SOLE_POST,
  LIKE_ACTION,
  COLLECT_ACTION,
  RECEIVE_JOINED_CIRCLES,
  RECEIVE_MINE_POSTS,
  ADD_MINE_POSTS,
  RECEIVE_LIKED_POSTS,
  ADD_LIKED_POSTS,
  RECEIVE_COLLECTED_POSTS,
  ADD_COLLECTED_POSTS,
  RECEIVE_USER_NOTICES,
  ADD_USER_NOTICES
} = require('../constants/index')

const receiveCircles = data => ({
  type: RECEIVE_CIRCLES,
  data
})

const receiveSoleCircle = data => ({
  type: RECEIVE_SOLE_CIRCLE,
  data
})

const receivePopularPosts = data => ({
  type: RECEIVE_POPULAR_POSTS,
  cursor: 0,
  data
})

const addPopularPosts = (data, page) => ({
  type: ADD_POPULAR_POSTS,
  cursor: page - 1,
  data
})

const receiveSinglePosts = (id, data) => ({
  type: RECEIVE_SINGLE_POSTS,
  circleId: id,
  cursor: 0,
  data
})

const addSinglePosts = (id, data, page) => ({
  type: ADD_SINGLE_POSTS,
  circleId: id,
  cursor: page - 1,
  data
})

const joinSuccess = id => ({
  type: JOIN_CIRCLE,
  id
})

const addNewPost = id => ({
  type: PUBLISH_NEW_POST,
  id
})

const receiveSolePost = data => ({
  type: RECEIVE_SOLE_POST,
  data
})

const likeSuccess = (id, isAgree) => ({
  type: LIKE_ACTION,
  id,
  isAgree
})

const collectSuccess = (id, isCollection) => ({
  type: COLLECT_ACTION,
  id,
  isCollection
})

const receiveJoinedCircles = data => ({
  type: RECEIVE_JOINED_CIRCLES,
  data
})

const receiveMinePosts = data => ({
  type: RECEIVE_MINE_POSTS,
  cursor: 0,
  data
})

const addMinePosts = (data, page) => ({
  type: ADD_MINE_POSTS,
  cursor: page - 1,
  data
})

const receiveLikedPosts = data => ({
  type: RECEIVE_LIKED_POSTS,
  cursor: 0,
  data
})

const addLikedPosts = (data, page) => ({
  type: ADD_LIKED_POSTS,
  cursor: page - 1,
  data
})

const receiveCollectedPosts = data => ({
  type: RECEIVE_COLLECTED_POSTS,
  cursor: 0,
  data
})

const addCollectedPosts = (data, page) => ({
  type: ADD_COLLECTED_POSTS,
  cursor: page - 1,
  data
})

const receiveUserNotices = data => ({
  type: RECEIVE_USER_NOTICES,
  cursor: 0,
  data
})

const addUserNotices = (data, page) => ({
  type: ADD_USER_NOTICES,
  cursor: page - 1,
  data
})

module.exports = {
  receiveCircles,
  receiveSoleCircle,
  receivePopularPosts,
  addPopularPosts,
  receiveSinglePosts,
  addSinglePosts,
  joinSuccess,
  addNewPost,
  receiveSolePost,
  likeSuccess,
  collectSuccess,
  receiveJoinedCircles,
  receiveMinePosts,
  addMinePosts,
  receiveLikedPosts,
  addLikedPosts,
  receiveCollectedPosts,
  addCollectedPosts,
  receiveUserNotices,
  addUserNotices
}
