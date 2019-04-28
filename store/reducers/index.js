const { combineReducers } = require('../../lib/redux')
const circles = require('./circles')
const posts = require('./posts')
const comments = require('./comments')
const notices = require('./notices')
const circlePosts = require('./joins/circlePosts')
const popularIds = require('./joins/popularIds')

const rootReducer = combineReducers({
   circles,
   posts,
   comments,
   notices,
   circlePosts,
   popularIds
})

module.exports = rootReducer