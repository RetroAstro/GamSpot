const { unique } = require('../../../utils/index')
const { RECEIVE_CIRCLES } = require('../../constants/index')

const loadPopularCircles = (state, { data }) => unique([
  ...state,
  ...data.map(item => item.id)
])

const popularCircles = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CIRCLES:
      return loadPopularCircles(state, action)
    default:
      return state
  }
}

module.exports = popularCircles
