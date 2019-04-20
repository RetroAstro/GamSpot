const {
   RECEIVE_CIRCLES,
   JOIN_CIRCLE
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

module.exports = {
   fetchCircles,
   joinCircle
}