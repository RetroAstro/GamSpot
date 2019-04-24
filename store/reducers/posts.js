const { combineReducers } = require('../../lib/redux')

const postsById = (state = {}, action) => {
   switch (action.type) {
      default:
         return state
   }
}

const allPosts = (state = [], action) => {
   switch (action.type) {
      default:
         return state
   }
}

module.exports = combineReducers({
   byId: postsById,
   allIds: allPosts
})