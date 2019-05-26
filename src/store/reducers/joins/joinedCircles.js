const { unique } = require('../../../utils/index')
const { RECEIVE_JOINED_CIRCLES } = require('../../constants/index')

const loadJoinedCircles = (state, { data }) => unique([
  ...state,
  ...data.map(item => item.id)
])

const joinedCircles = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_JOINED_CIRCLES:
      return loadJoinedCircles(state, action)
    default:
      return state
  }
}

module.exports = joinedCircles
