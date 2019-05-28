const { baseUrl } = require('../config/index')

const routes = {
  GET_FRESH_JWT: '/app/token',
  SEND_BIND_DATA: '/app/student',
  SELECT_GENDER: '/app/gender',
  GET_ALL_CIRCLES: '/circles',
  UPLOAD_IMAGE: '/file',
  IMAGE_DOMAIN: '/talks/picture',
  SEND_NEW_POST: '/talks',
  SEND_COMMENT: '/talks/comments',
  GET_JOINED_CIRCLES: '/user/joining',
  GET_MINE_POSTS: '/user/talks',
  GET_LIKED_POSTS: '/user/agrees',
  GET_COLLECTED_POSTS: '/user/collections',
  GET_USER_NOTICES: '/user/message',
  RESET_ALL_DATA: '/refreshDB'
}

const urls = Object.entries(routes)
  .map(([key, value]) => ({ [key]: baseUrl + value }))
  .reduce((prev, next) => ({ ...prev, ...next }))

module.exports = urls
