const { combineReducers } = require('../../../lib/redux')
const { unique } = require('../../../utils/index')

const {
   RECEIVE_SINGLE_POSTS
} = require('../../constants/index')

const loadCirclePost = (state, { circleId, data }) => {
   const result = data
      .map(item => ({ [item.id]: { circleId } })).reduce((prev, next) => ({ ...prev, ...next }))

   return {
      ...state,
      ...result
   }
}

const circlePostById = (state = {}, action) => {
   switch (action.type) {
      case RECEIVE_SINGLE_POSTS:
         return loadCirclePost(state, action)
      default:
         return state
   }
}

const loadCirclePostIds = (state, { data }) => unique([
   ...state,
   ...data.map(item => item.id)
])

const circlePostIds = (state = [], action) => {
   switch (action.type) {
      case RECEIVE_SINGLE_POSTS:
         return loadCirclePostIds(state, action)
      default:
         return state
   }
}

module.exports = combineReducers({
   byId: circlePostById,
   allIds: circlePostIds
})