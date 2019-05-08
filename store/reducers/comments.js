const { combineReducers } = require('../../lib/redux')

const {
   RECEIVE_SOLE_POST
} = require('../constants/index')

const loadSolePostComments = (state, { data: { comments } }) => {
   let middle = comments
      .map(item => ({ [item.commentId]: item })).reduce((prev, next) => ({ ...prev, ...next }), {})
      
   return {
      ...state,
      ...middle
   }
}

const commentsById = (state = {}, action) => {
   switch (action.type) {
      case RECEIVE_SOLE_POST:
         return loadSolePostComments(state, action)
      default:
         return state
   }
}

module.exports = combineReducers({ byId: commentsById })