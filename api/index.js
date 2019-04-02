const {
   GET_FRESH_JWT,
   SEND_BIND_DATA
} = require('./config')

const getToken = () => qq.getStorageSync('jwt').token

const setFreshJWT = () => {
   return new Promise(resolve => {
      qq.login({
         success({ code }) {
            qq.request({
               url: GET_FRESH_JWT,
               method: 'POST',
               data: { code },
               success(res) {
                  var { exp } = atob(res.data.data.split('.')[1])
                  qq.setStorageSync('jwt', { exp, token: res.data.data })
                  resolve()
               }
            })
         }
      })
   })
}

const sendBindData = () => {
   return new Promise(resolve => {
      qq.getUserInfo({
         withCredentials: true,
         success({ iv, encryptedData, signauture }) {
            qq.request({
               url: SEND_BIND_DATA,
               method: 'POST',
               header: {
                  'Authorization': 'Bearer ' + getToken()
               },
               data: {
                  iv,
                  encryptedData,
                  signauture,
                  student: {
                     stuid: '2017212786',
                     nickname: 'RetroAstro',
                     identification: '080410'
                  }
               },
               success (res) {
                  resolve(res)
               }
            })
         }
      })
   })
}

module.exports = {
   setFreshJWT,
   sendBindData
}