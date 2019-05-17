const { opts } = require('./config')
const { Base64 } = require('../utils/base64')
const { promisify } = require('../utils/index')

const {
   GET_FRESH_JWT,
   SEND_BIND_DATA,
   SELECT_GENDER,
   GET_ALL_CIRCLES,
   UPLOAD_IMAGE,
   SEND_NEW_POST,
   SEND_COMMENT,
   RESET_ALL_DATA
} = require('./urls')

const {
   alterPosts,
   alterSolePost,
} = require('./alter')

const getCode = promisify((resolve) => {
   const setCode = () => {
      qq.login({
         success({ code }) {
            qq.setStorageSync('code', code)
            resolve(code)
         }
      })
   }

   let code = qq.getStorageSync('code')
   
   if (code) {
      qq.checkSession({
         success() {
            resolve(code)
         },
         fail() {
            setCode()
         }
      })
   } else {
      setCode()
   }
})

const setFreshJWT = promisify((resolve) => {
   qq.showLoading({ title: '等待中', mask: true })

   getCode().then(code => {
      qq.request({
         url: GET_FRESH_JWT,
         method: 'POST',
         data: { code },
         success({ data: { status, data } }) {
            if (status === 10000) {
               let userInfo = JSON.parse(Base64.decode(data.split('.')[1]))
            
               qq.setStorageSync('userInfo', { ...userInfo, token: data })
               qq.hideLoading()
               resolve()
            }
         }
      })
   })
})

const sendBindData = promisify((data, resolve) => {
   qq.getUserInfo({
      withCredentials: true,
      success({ iv, encryptedData, signature }) {
         qq.request({
            ...opts(),
            url: SEND_BIND_DATA,
            data: {
               iv,
               encryptedData,
               signature,
               student: data
            },
            success (res) {
               resolve(res.data)
            }
         })
      },
      fail() {
         // deal with unexpected user action
         qq.hideLoading()
         qq.setStorageSync('userInfo', {})
         qq.redirectTo({ url: '/pages/buffer/buffer' })
      }
   })
})

const sendGender = promisify((gender, resolve) => {
   qq.request({
      ...opts(),
      url: SELECT_GENDER,
      data: gender,
      success(res) {
         resolve(res.data)
      }
   })
})

const getCircles = promisify((resolve) => {
   qq.request({
      ...opts(),
      url: GET_ALL_CIRCLES,
      method: 'GET',
      success({ data: { status, data } }) {
         if (status === 10000) {
            resolve(data)
         }
      }
   })
})

const getPopularPosts = promisify((page, resolve) => {
   qq.request({
      ...opts(),
      url: `${GET_ALL_CIRCLES}/hot?page=${page}`,
      method: 'GET',
      success({ data: { status, data } }) {
         if (status === 10000) {
            resolve(alterPosts(data))
         }
      }
   })
})

const getSinglePosts = promisify((circleId, page, resolve) => {
   qq.request({
      ...opts(),
      url: `${GET_ALL_CIRCLES}/${circleId}?page=${page}`,
      method: 'GET',
      success({ data: { status, data } }) {
         if (status === 10000) {
            resolve(alterPosts(data))
         }
      }
   })
})

const sendCircleId = promisify((id, resolve) => {
   qq.request({
      ...opts(),
      url: `${GET_ALL_CIRCLES}/${id}/joining`,
      success({ data: { status } }) {
         if (status === 10000) {
            resolve()
         }
      }
   })
})

const uploadImage = promisify((imagePath, resolve) => {
   qq.uploadFile({
      ...opts(),
      url: UPLOAD_IMAGE,
      filePath: imagePath,
      name: 'file',
      success(res) {
         let { status, data } = JSON.parse(res.data)
         
         if (status === 10000) {
            resolve(data)
         }
      }
   })
})

const sendNewPost = promisify((data, resolve) => {
   qq.request({
      ...opts(),
      url: SEND_NEW_POST,
      data,
      success({ data: { status } }) {
         if (status === 10000) {
            resolve()
         }
      }
   })
})

const getSolePost = promisify((postId, resolve) => {
   qq.request({
      ...opts(),
      url: `${SEND_NEW_POST}/${postId}`,
      method: 'GET',
      success({ data: { status, data } }) {
         if (status === 10000) {
            resolve(alterSolePost(data))
         }
      }
   })
})

const sendComment = promisify((data, resolve) => {
   qq.request({
      ...opts(),
      url: SEND_COMMENT,
      data,
      success({ data: { status } }) {
         if (status === 10000) {
            resolve()
         }
      }
   })
})

const sendLikeStatus = promisify((postId, isAgree, resolve) => {
   qq.request({
      ...opts(),
      url: `${SEND_NEW_POST}/${postId}/agree/${isAgree ? 'up' : 'down'}`,
      success({ data: { status } }) {
         if (status === 10000) {
            resolve()
         }
      }
   })
})

const sendCollectStatus = promisify((postId, isCollection, resolve) => {
   qq.request({
      ...opts(),
      url: `${SEND_NEW_POST}/${postId}/collection/${isCollection ? 'up' : 'down'}`,
      success({ data: { status } }) {
         if (status === 10000) {
            resolve()
         }
      }
   })
})

const resetAllData = () => {
   qq.request({
      ...opts(),
      url: RESET_ALL_DATA,
      success(res) {
         console.log(res)
      }
   })
}

module.exports = {
   setFreshJWT,
   sendBindData,
   sendGender,
   getCircles,
   getPopularPosts,
   getSinglePosts,
   sendCircleId,
   uploadImage,
   sendNewPost,
   getSolePost,
   sendComment,
   sendLikeStatus,
   sendCollectStatus,
   resetAllData
}