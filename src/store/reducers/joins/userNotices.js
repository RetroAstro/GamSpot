const {
  RECEIVE_USER_NOTICES,
  ADD_USER_NOTICES
} = require('../../constants/index')

const loadUserNotices = (state, { cursor, data }) => ({
  [cursor]: data.map(item => item.noticeId)
})

const addUserNotices = (state, { cursor, data }) => ({
  ...state,
  [cursor]: data.map(item => item.noticeId)
})

const userNotices = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USER_NOTICES:
      return loadUserNotices(state, action)
    case ADD_USER_NOTICES:
      return addUserNotices(state, action)
    default:
      return state
  }
}

module.exports = userNotices
