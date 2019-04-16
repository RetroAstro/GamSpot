const { baseUrl } = require('./config')

const url = route => baseUrl + route

module.exports = {
   GET_FRESH_JWT: url('/app/login'),
   SEND_BIND_DATA: url('/app/binding'),
   SELECT_GENDER: url('/app/selectGender'),
   RESET_ALL_DATA: url('/refreshDB')
}