const { combineReducers } = require('../../lib/redux')
const circles = require('./circles')
const posts = require('./posts')
const comments = require('./comments')
const notices = require('./notices')

const rootReducer = combineReducers({
   circles,
   posts,
   comments,
   notices
})

module.exports = rootReducer