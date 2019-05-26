const { combineReducers } = require('../../lib/redux')
const circles = require('./circles')
const posts = require('./posts')
const comments = require('./comments')
const notices = require('./notices')
const popularCircles = require('./joins/popularCircles')
const joinedCircles = require('./joins/joinedCircles')
const circlePosts = require('./joins/circlePosts')
const popularPosts = require('./joins/popularPosts')
const minePosts = require('./joins/minePosts')
const likedPosts = require('./joins/likedPosts')
const collectedPosts = require('./joins/collectedPosts')
const postComments = require('./joins/postComments')

const rootReducer = combineReducers({
  circles,
  posts,
  comments,
  notices,
  popularCircles,
  joinedCircles,
  circlePosts,
  popularPosts,
  minePosts,
  likedPosts,
  collectedPosts,
  postComments
})

module.exports = rootReducer
