const {
   RECEIVE_CIRCLES,
   JOIN_CIRCLE,
   PUBLISH_NEW_POST
} = require('../constants/index')

const addJoinCount = (state, { id }) => {
   return state.map(
      item => item.id == id ?
      {
         ...item,
         isJoin: true,
         joinCount: item.joinCount + 1
      } : item
   )
}

const addTalkingCount = (state, { id }) => {
   return state.map(
      item => item.id == id ?
      {
         ...item,
         talkingCount: item.talkingCount + 1
      } : item
   )
}

const circles = (state = [], action) => {
   switch (action.type) {
      case RECEIVE_CIRCLES:
         return action.data
      case JOIN_CIRCLE:
         return addJoinCount(state, action)
      case PUBLISH_NEW_POST:
         return addTalkingCount(state, action)
      default:
         return state
   }
}

module.exports = circles