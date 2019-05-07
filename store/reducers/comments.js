const { combineReducers } = require('../../lib/redux')

const {
   RECEIVE_SOLE_POST
} = require('../constants/index')

const createCommentId = ({ author: { id }, timestamp }) => (id + timestamp)

const loadSolePostComments = (state, { data: { comments } }) => {
   let result = comments
      .map(item => ({ [createCommentId(item)]: item })).reduce((prev, next) => ({ ...prev, ...next }), {})

   return {
      ...state,
      ...result
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