const { combineReducers } = require('../../lib/redux')
const circles = require('./circles')
const posts = require('./posts')
const comments = require('./comments')
const notices = require('./notices')
const circlePosts = require('./joins/circlePosts')
const popularPosts = require('./joins/popularPosts')
const postComments = require('./joins/postComments')

const rootReducer = combineReducers({
  circles,
  posts,
  comments,
  notices,
  circlePosts,
  popularPosts,
  postComments
})

module.exports = rootReducer
