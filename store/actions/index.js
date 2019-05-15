const {
   RECEIVE_CIRCLES,
   RECEIVE_SINGLE_POSTS,
   RECEIVE_SOLE_POST,
   ADD_SINGLE_POSTS,
   JOIN_CIRCLE,
   PUBLISH_NEW_POST,
   LIKE_ACTION,
   COLLECT_ACTION
} = require('../constants/index')

const {
   getCircles,
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
   .then(data => page == 1 ? dispatch(receiveSinglePosts(id, data)) : dispatch(addSinglePosts(id, data, page)))
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
   fetchSinglePosts,
   joinCircle,
   publishNewPost,
   fetchSolePost,
   likeAction,
   collectAction
}