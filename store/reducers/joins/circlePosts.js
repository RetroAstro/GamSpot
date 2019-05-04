const {
   RECEIVE_SINGLE_POSTS,
   ADD_SINGLE_POSTS
} = require('../../constants/index')

const loadCirclePosts = (state, { circleId, cursor, data }) => {
   const result = {
      [circleId]: {
         [cursor]: data.map(item => item.id)
      }
   }

   return {
      ...state,
      ...result
   }
}

const addCirclePosts = (state, { circleId, cursor, data }) => {
   const result = {
      [circleId]: {
         ...state[circleId],
         [cursor]: data.map(item => item.id)
      }
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
      case ADD_SINGLE_POSTS:
         return addCirclePosts(state, action)
      default:
         return state
   }
}

module.exports = circlePosts