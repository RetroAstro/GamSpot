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
  GET_JOINED_CIRCLES,
  GET_MINE_POSTS,
  GET_LIKED_POSTS,
  GET_COLLECTED_POSTS,
  GET_USER_NOTICES,
  EDIT_NICKNAME,
  RESET_ALL_DATA
} = require('./urls')

const {
  alterPosts,
  alterSolePost,
  alterNotices
} = require('./alter')

const setFreshJWT = promisify(resolve => {
  qq.showLoading({ title: '等待中', mask: true })

  qq.login({
    success({ code }) {
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
    }
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
        success({ data }) {
          resolve(data)
        }
      })
    }
  })
})

const sendGender = promisify((gender, resolve) => {
  qq.request({
    ...opts(),
    url: SELECT_GENDER,
    data: gender,
    success({ data: { status } }) {
      if (status === 10000) {
        resolve()
      }
    }
  })
})

const getCircles = promisify(resolve => {
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

const getSoleCircle = promisify((circleId, resolve) => {
  qq.request({
    ...opts(),
    url: `${GET_ALL_CIRCLES}/${circleId}/info`,
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

const uploadImage = promisify((imagePath, resolve, reject) => {
  qq.uploadFile({
    ...opts(),
    url: UPLOAD_IMAGE,
    filePath: imagePath,
    name: 'file',
    success(res) {
      let { status, data } = JSON.parse(res.data)

      if (status === 10000) {
        resolve(data)
      } else {
        reject()
      }
    }
  })
})

const sendNewPost = promisify((data, resolve, reject) => {
  qq.request({
    ...opts(),
    url: SEND_NEW_POST,
    data,
    success({ data: { status } }) {
      if (status === 10000) {
        resolve()
      } else {
        reject()
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

const sendComment = promisify((data, resolve, reject) => {
  qq.request({
    ...opts(),
    url: SEND_COMMENT,
    data,
    success({ data: { status } }) {
      if (status === 10000) {
        resolve()
      } else {
        reject()
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

const getJoinedCircles = promisify(resolve => {
  qq.request({
    ...opts(),
    url: GET_JOINED_CIRCLES,
    method: 'GET',
    success({ data: { status, data } }) {
      if (status === 10000) {
        resolve(data)
      }
    }
  })
})

const getMinePosts = promisify((page, resolve) => {
  qq.request({
    ...opts(),
    url: `${GET_MINE_POSTS}?page=${page}`,
    method: 'GET',
    success({ data: { status, data } }) {
      if (status === 10000) {
        resolve(alterPosts(data))
      }
    }
  })
})

const getLikedPosts = promisify((page, resolve) => {
  qq.request({
    ...opts(),
    url: `${GET_LIKED_POSTS}?page=${page}`,
    method: 'GET',
    success({ data: { status, data } }) {
      if (status === 10000) {
        resolve(alterPosts(data))
      }
    }
  })
})

const getCollectedPosts = promisify((page, resolve) => {
  qq.request({
    ...opts(),
    url: `${GET_COLLECTED_POSTS}?page=${page}`,
    method: 'GET',
    success({ data: { status, data } }) {
      if (status === 10000) {
        resolve(alterPosts(data))
      }
    }
  })
})

const getUserNotices = promisify((page, resolve) => {
  qq.request({
    ...opts(),
    url: `${GET_USER_NOTICES}?page=${page}`,
    method: 'GET',
    success({ data: { status, data } }) {
      if (status === 10000) {
        resolve(alterNotices(data))
      }
    }
  })
})

const editNickname = promisify((data, resolve, reject) => {
  qq.request({
    ...opts(),
    url: EDIT_NICKNAME,
    data,
    success({ data: { status } }) {
      if (status === 10000) {
        qq.setStorageSync('userInfo', {
          ...qq.getStorageSync('userInfo'),
          nickname: data.nickname
        })
        resolve()
      } else {
        reject()
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
  getSoleCircle,
  getPopularPosts,
  getSinglePosts,
  sendCircleId,
  uploadImage,
  sendNewPost,
  getSolePost,
  sendComment,
  sendLikeStatus,
  sendCollectStatus,
  getJoinedCircles,
  getMinePosts,
  getLikedPosts,
  getCollectedPosts,
  getUserNotices,
  editNickname,
  resetAllData
}
