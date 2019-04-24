const circles = require('./circles')
const posts = require('./posts')
const comments = require('./comments')
const notices = require('./notices')

const actionCreators = {
   ...circles,
   ...posts,
   ...comments,
   ...notices
}

module.exports = actionCreators