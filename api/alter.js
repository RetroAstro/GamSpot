const { timeFromNow } = require('../utils/index')

const {
   IMAGE_DOMAIN
} = require('./urls')

const alterSinglePosts = data => {
   const result = data.map(item => ({
      ...item,
      createdTime: timeFromNow(item.timestamp),
      images: item.images ? item.images.map(image => `${IMAGE_DOMAIN}/${image}`) : []
   }))

   return result
}

module.exports = {
   alterSinglePosts
}