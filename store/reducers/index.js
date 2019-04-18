const { combineReducers } = require('../../lib/redux')

const {
   RECEIVE_CIRCLES,
   JOIN_CIRCLE
} = require('../constants/index')

const circles = (state = [], action) => {
   switch (action.type) {
      case RECEIVE_CIRCLES:
         return action.data
      case JOIN_CIRCLE:
         return state.map(
            item => item.id === action.id ?
            {
               ...item,
               isJoin: true,
               joinCount: item.joinCount + 1
            } : item
         )
      default:
         return state
   }
}

const rootReducer = combineReducers({
   circles
})

module.exports = rootReducer