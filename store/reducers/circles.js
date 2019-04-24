const {
   RECEIVE_CIRCLES,
   JOIN_CIRCLE,
   PUBLISH_NEW_POST
} = require('../constants/index')

const circles = (state = [], action) => {
   switch (action.type) {
      case RECEIVE_CIRCLES:
         return action.data
      case JOIN_CIRCLE:
         return state.map(
            item => item.id == action.id ?
            {
               ...item,
               isJoin: true,
               joinCount: item.joinCount + 1
            } : item
         )
      case PUBLISH_NEW_POST:
         return state.map(
            item => item.id == action.id ?
            {
               ...item,
               talkingCount: item.talkingCount + 1
            } : item
         )
      default:
         return state
   }
}

module.exports = circles