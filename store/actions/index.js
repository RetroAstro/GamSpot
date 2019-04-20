const {
   RECEIVE_CIRCLES,
   JOIN_CIRCLE,
   PUBLISH_NEW_POST
} = require('../constants/index')

const {
   getCircles,
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
   joinCircle,
   publishNewPost
}