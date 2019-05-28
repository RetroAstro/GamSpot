const { combineReducers } = require('../../lib/redux')

const {
  RECEIVE_USER_NOTICES,
  ADD_USER_NOTICES
} = require('../constants/index')

const loadNotices = (state, { data }) => {
  let middle = data
    .map(item => ({ [item.noticeId]: item }))
    .reduce((prev, next) => ({ ...prev, ...next }), {})

  return {
    ...state,
    ...middle
  }
}

const noticesById = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_NOTICES:
    case ADD_USER_NOTICES:
      return loadNotices(state, action)
    default:
      return state
  }
}

module.exports = combineReducers({ byId: noticesById })
