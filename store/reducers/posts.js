const { combineReducers } = require('../../lib/redux')

const {
   RECEIVE_SINGLE_POSTS,
   RECEIVE_SOLE_POST,
   ADD_SINGLE_POSTS,
} = require('../constants/index')

const loadSinglePosts = (state, { data }) => {
   let result = data
      .map(item => ({ [item.id]: item })).reduce((prev, next) => ({ ...prev, ...next }), {})
      
   return {
      ...state,
      ...result
   }
}

const addSolePost = (state, { data: { post } }) => ({ ...state, [post.id]: post })

const postsById = (state = {}, action) => {
   switch (action.type) {
      case RECEIVE_SINGLE_POSTS:
      case ADD_SINGLE_POSTS:
         return loadSinglePosts(state, action)
      case RECEIVE_SOLE_POST: 
         return addSolePost(state, action)
      default:
         return state
   }
}

module.exports = combineReducers({ byId: postsById })