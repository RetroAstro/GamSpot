const { unique } = require('../../../utils/index')

const {
   RECEIVE_SINGLE_POSTS
} = require('../../constants/index')

const loadCirclePosts = (state, { circleId, data }) => {
   const result = {
      [circleId]: unique([
         ...(state[circleId] || []),
         ...data.map(item => item.id)
      ])
   }

   return {
      ...state,
      ...result
   }
}

const circlePosts = (state = {}, action) => {
   switch (action.type) {
      case RECEIVE_SINGLE_POSTS:
         return loadCirclePosts(state, action)
      default:
         return state
   }
}

module.exports = circlePosts