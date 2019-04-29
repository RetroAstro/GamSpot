const {
   RECEIVE_CIRCLES,
   RECEIVE_SINGLE_POSTS,
   JOIN_CIRCLE,
   PUBLISH_NEW_POST
} = require('../constants/index')

const {
   getCircles,
   getSinglePosts,
   sendCircleId
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
   data
})

const fetchSinglePosts = (id, page = 1) => dispatch => {
   getSinglePosts(id, page)
   .then(data => dispatch(receiveSinglePosts(id, data)))
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

module.exports = {
   fetchCircles,
   fetchSinglePosts,
   joinCircle,
   publishNewPost
}