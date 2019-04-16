const { baseUrl } = require('./config')

const routes = {
   GET_FRESH_JWT: '/app/login',
   SEND_BIND_DATA: '/app/binding',
   SELECT_GENDER: '/app/selectGender',
   RESET_ALL_DATA: '/refreshDB'
}

const urls = Object.entries(routes).map(([key, value]) => ({ [key]: baseUrl + value })).reduce((prev, next) => ({ ...prev, ...next }))

module.exports = urls
