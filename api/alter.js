const { timeFromNow } = require('../utils/index')

const {
   IMAGE_DOMAIN
} = require('./urls')

const alterPost = post => {
   let result = {
      ...post,
      createdTime: timeFromNow(post.timestamp),
      images: post.images ? post.images.map(image => `${IMAGE_DOMAIN}/${image}`) : []
   }

   return result
}

const alterSinglePosts = data => data.map(alterPost)

const normalizeCommit = commit => {

}

const alterSolePost = data => {
   let comments = normalizeCommit(data.commit)
   delete data.commit
   let post = alterPost(data)

   return { post, comments }
}

module.exports = {
   alterSinglePosts,
   alterSolePost
}