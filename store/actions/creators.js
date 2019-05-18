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
   COLLECT_ACTION
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

const joinCircleSuccess = id => ({
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

module.exports = {
   receiveCircles,
   receiveSoleCircle,
   receivePopularPosts,
   addPopularPosts,
   receiveSinglePosts,
   addSinglePosts,
   joinCircleSuccess,
   addNewPost,
   receiveSolePost,
   likeSuccess,
   collectSuccess
}