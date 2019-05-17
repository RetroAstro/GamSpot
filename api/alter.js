const { timeFromNow } = require('../utils/index')

const {
   IMAGE_DOMAIN
} = require('./urls')

const formatPost = post => {
   let result = {
      ...post,
      createdTime: timeFromNow(post.timestamp),
      images: post.images ? post.images.map(image => `${IMAGE_DOMAIN}/${image}`) : []
   }

   return result
}

const alterPosts = data => data.map(formatPost)

const normalizeCommit = commit => {
   const normalize = (commit, recipient) => {
      let result = []

      const recursive = (commit, recipient) => {
         commit.map(({ author: { nickname }, id, content, commit, timestamp }) => {
            result.push({ sender: nickname, id, content, recipient, timestamp })

            if (commit.length) {
               recursive(commit, nickname)
            }
         })
      }
      
      recursive(commit, recipient)

      return result
   }

   const reorder = data => data.sort((prev, next) => prev.timestamp - next.timestamp)

   const createCommentId = ({ author: { id }, timestamp }) => (id + timestamp)

   return commit.map(item => {
      let childComments = reorder(normalize(item.commit, item.author.nickname))
      delete item.commit

      return {
         ...item,
         childComments,
         commentId: createCommentId(item),
         createdTime: timeFromNow(item.timestamp)
      }
   })
}

const alterSolePost = data => {
   let comments = normalizeCommit(data.commit)
   delete data.commit
   let post = formatPost(data)

   return { post, comments }
}

module.exports = {
   alterPosts,
   alterSolePost
}