const {
   RECEIVE_CIRCLES,
   RECEIVE_POPULAR_POSTS,
   ADD_POPULAR_POSTS,
   RECEIVE_SINGLE_POSTS,
   ADD_SINGLE_POSTS,
   JOIN_CIRCLE,
   PUBLISH_NEW_POST,
   RECEIVE_SOLE_POST,
   LIKE_ACTION,
   COLLECT_ACTION
} = require('../constants/index')

const {
   getCircles,
   getPopularPosts,
   getSinglePosts,
   sendCircleId,
   getSolePost,
} = require('../../api/index')

const receiveCircles = data => ({
   type: RECEIVE_CIRCLES,
   data
})

const fetchCircles = () => dispatch => {
   getCircles()
   .then(data => dispatch(receiveCircles(data)))
}

const receivePopularPosts = data => ({
   type: RECEIVE_POPULAR_POSTS,
   cursor: 0,
   data
})

const addPopularPosts = (data, page) => ({
   type: ADD_POPULAR_POSTS,
   cursor: page - 1,
   data
})

const fetchPopularPosts = (page = 1) => dispatch => {
   getPopularPosts(page)
   .then(data => page == 1 ? dispatch(receivePopularPosts(data)) : dispatch(addPopularPosts(data, page)))
}

const receiveSinglePosts = (id, data) => ({
   type: RECEIVE_SINGLE_POSTS,
   circleId: id,
   cursor: 0,
   data
})

const addSinglePosts = (id, data, page) => ({
   type: ADD_SINGLE_POSTS,
   circleId: id,
   cursor: page - 1,
   data
})

const fetchSinglePosts = (id, page = 1) => dispatch => {
   getSinglePosts(id, page)
   .then(data => {
      if (page == 1) {
         dispatch(receiveSinglePosts(id, data)) && dispatch(fetchCircles())
      } else {
         dispatch(addSinglePosts(id, data, page))
      }
   })
}

const joinSuccess = id => ({
   type: JOIN_CIRCLE,
   id
})

const joinCircle = id => dispatch => {
   sendCircleId(id)
   .then(() => dispatch(joinSuccess(id)))
}

const addNewPost = id => ({
   type: PUBLISH_NEW_POST,
   id
})

const publishNewPost = id => dispatch => dispatch(addNewPost(id)) && dispatch(fetchSinglePosts(id))

const receiveSolePost = data => ({
   type: RECEIVE_SOLE_POST,
   data
})

const fetchSolePost = id => dispatch => {
   getSolePost(id)
   .then(data => dispatch(receiveSolePost(data)))
}

const likeAction = (id, isAgree) => dispatch => dispatch({
   type: LIKE_ACTION,
   id,
   isAgree
})

const collectAction = (id, isCollection) => dispatch => dispatch({
   type: COLLECT_ACTION,
   id,
   isCollection
})

module.exports = {
   fetchCircles,
   fetchPopularPosts,
   fetchSinglePosts,
   joinCircle,
   publishNewPost,
   fetchSolePost,
   likeAction,
   collectAction
}