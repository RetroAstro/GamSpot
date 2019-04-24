const { combineReducers } = require('../../lib/redux')

const commentsById = (state = {}, action) => {
   switch (action.type) {
      default:
         return state
   }
}

const allComments = (state = [], action) => {
   switch (action.type) {
      default:
         return state
   }
}

module.exports = combineReducers({
   byId: commentsById,
   allIds: allComments
})