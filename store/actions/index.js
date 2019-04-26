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

const fetchSinglePosts = id => dispatch => {
   getSinglePosts(id)
   .then(data => data.length ? dispatch(receiveSinglePosts(id, data)) : null)
}

const joinSuccess = id => ({
   type: JOIN_CIRCLE,
   id
})

const joinCircle = id => dispatch => {
   sendCircleId(id)
   .then(() => dispatch(joinSuccess(id)))
}

const publishNewPost = data => ({
   type: PUBLISH_NEW_POST,
   ...data
})

module.exports = {
   fetchCircles,
   fetchSinglePosts,
   joinCircle,
   publishNewPost
}