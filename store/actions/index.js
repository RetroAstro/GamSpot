const { opts } = require('../../api/config')

const {
   GET_ALL_CIRCLES
} = require('../../api/urls')

const {
   RECEIVE_CIRCLES,
   JOIN_CIRCLE
} = require('../constants/index')

const receiveCircles = data => ({
   type: RECEIVE_CIRCLES,
   data
})

const fetchCircles = () => dispatch => {
   qq.request({
      ...opts(),
      url: GET_ALL_CIRCLES,
      method: 'GET',
      success(res) {
         dispatch(receiveCircles(res.data.data))
      }
   })
}

const joinSuccess = id => ({
   type: JOIN_CIRCLE,
   id
})

const joinCircle = id => dispatch => {
   qq.request({
      ...opts(),
      url: `${GET_ALL_CIRCLES}/${id}/joining`,
      success({ data: { status } }) {
         if (status === 10000) {
            dispatch(joinSuccess(id))
         }
      }
   })
}

module.exports = {
   fetchCircles,
   joinCircle
}