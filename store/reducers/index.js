const { combineReducers } = require('../../lib/redux')
const circles = require('./circles')
const posts = require('./posts')
const comments = require('./comments')
const notices = require('./notices')
const circlePost = require('./joins/circlePost')
const popularIds = require('./joins/popularIds')

const rootReducer = combineReducers({
   circles,
   posts,
   comments,
   notices,
   circlePost,
   popularIds
})

module.exports = rootReducer