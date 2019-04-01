const {
   CHECK_JWT,
   CREATE_SESSION_KEY,
   SEND_ENCRYPTED_DATA,
} = require('./config')

const isStaleJWT = () => {
   return new Promise(resolve => {
      qq.request({
         url: CHECK_JWT,
         method: 'GET',
         success({ stale }) {
            stale ? resolve(true) : resolve(false)
         }
      })
   })
}

const getFreshJWT = code => {
   return new Promise(resolve => {
      qq.request({
         url: CREATE_SESSION_KEY,
         method: 'POST',
         data: Form({ code }),
         success() {
            qq.getUserInfo({
               withCredentials: true,
               success({ iv, encryptedData }) {
                  qq.request({
                     url: SEND_ENCRYPTED_DATA,
                     method: 'POST',
                     data: Form({ iv, encryptedData }),
                     success (res) {
                        resolve(res)
                     }
                  })
               }
            })
         }
      })
   })
}

module.exports = {
   isStaleJWT,
   getFreshJWT
}