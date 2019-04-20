const { baseUrl } = require('../config/index')

const routes = {
   GET_FRESH_JWT: '/app/token',
   SEND_BIND_DATA: '/app/student',
   SELECT_GENDER: '/app/gender',
   GET_ALL_CIRCLES: '/circles',
   RESET_ALL_DATA: '/refreshDB',
   UPLOAD_IMAGE: '/talks/picture',
   SEND_NEW_POST: '/talks',
}

const urls = Object.entries(routes).map(([key, value]) => ({ [key]: baseUrl + value })).reduce((prev, next) => ({ ...prev, ...next }))

module.exports = urls