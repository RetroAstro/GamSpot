const { combineReducers } = require('../../lib/redux')
const { unique } = require('../../utils/index')

const {
   RECEIVE_SINGLE_POSTS,
   ADD_SINGLE_POSTS
} = require('../constants/index')

const loadSinglePosts = (state, { data }) => {
   const posts = data
      .map(item => ({ [item.id]: item })).reduce((prev, next) => ({ ...prev, ...next }), {})
      
   return {
      ...state,
      ...posts
   }
}

const postsById = (state = {}, action) => {
   switch (action.type) {
      case RECEIVE_SINGLE_POSTS:
      case ADD_SINGLE_POSTS:
         return loadSinglePosts(state, action)
      default:
         return state
   }
}

const loadSinglePostsIds = (state, { data }) => unique([
   ...state,
   ...data.map(item => item.id)
])

const allPosts = (state = [], action) => {
   switch (action.type) {
      case RECEIVE_SINGLE_POSTS:
      case ADD_SINGLE_POSTS:
         return loadSinglePostsIds(state, action)
      default:
         return state
   }
}

module.exports = combineReducers({
   byId: postsById,
   allIds: allPosts
})