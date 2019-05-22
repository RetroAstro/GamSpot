const { combineReducers } = require('../../lib/redux')
const { unique } = require('../../utils/index')

const {
  RECEIVE_CIRCLES,
  RECEIVE_SOLE_CIRCLE,
  JOIN_CIRCLE,
  PUBLISH_NEW_POST
} = require('../constants/index')

const loadCircles = (state, { data }) => {
  let middle = data
    .map(item => ({ [item.id]: item }))
    .reduce((prev, next) => ({ ...prev, ...next }), {})

  return {
    ...state,
    ...middle
  }
}

const addSoleCircle = (state, { data }) => ({
  ...state,
  [data.id]: data
})

const addJoinCount = (state, { id }) => {
  let result = {
    ...state,
    [id]: {
      ...state[id],
      isJoin: true,
      joinCount: state[id].joinCount + 1
    }
  }

  return result
}

const addTalkingCount = (state, { id }) => {
  let result = {
    ...state,
    [id]: {
      ...state[id],
      talkingCount: state[id].talkingCount + 1
    }
  }

  return result
}

const circlesById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CIRCLES:
      return loadCircles(state, action)
    case RECEIVE_SOLE_CIRCLE:
      return addSoleCircle(state, action)
    case JOIN_CIRCLE:
      return addJoinCount(state, action)
    case PUBLISH_NEW_POST:
      return addTalkingCount(state, action)
    default:
      return state
  }
}

const loadCirclesIds = (state, { data }) => unique([
  ...state,
  ...data.map(item => item.id)
])

const addSoleCircleId = (state, { data: { id } }) => unique([
  ...state,
  id
])

const allCircles = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CIRCLES:
      return loadCirclesIds(state, action)
    case RECEIVE_SOLE_CIRCLE:
      return addSoleCircleId(state, action)
    default:
      return state
  }
}

module.exports = combineReducers({
  byId: circlesById,
  allIds: allCircles
})
