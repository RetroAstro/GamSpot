const { combineReducers } = require('../../lib/redux')

const {
   RECEIVE_CIRCLES
} = require('../constants/index')

const circles = (state = [], action) => {
   switch (action.type) {
      case RECEIVE_CIRCLES:
         return action.data
      default:
         return state
   }
}

const rootReducer = combineReducers({
   circles
})

module.exports = rootReducer