const { baseUrl } = require('../config/index')

const routes = {
   GET_FRESH_JWT: '/app/token',
   SEND_BIND_DATA: '/app/student',
   SELECT_GENDER: '/app/gender',
   GET_ALL_CIRCLES: '/circles',
   SEND_NEW_POST: '/talks',
   UPLOAD_IMAGE: '/talks/picture',
   SEND_COMMENT: '/talks/comments',
   RESET_ALL_DATA: '/refreshDB',
}

const urls = Object.entries(routes).map(([key, value]) => ({ [key]: baseUrl + value })).reduce((prev, next) => ({ ...prev, ...next }))

module.exports = urls