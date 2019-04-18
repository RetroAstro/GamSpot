const { opts } = require('../../api/config')

const {
   GET_ALL_CIRCLES
} = require('../../api/urls')

const {
   RECEIVE_CIRCLES
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

module.exports = {
   fetchCircles
}