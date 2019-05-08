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
   const normalize = (commit, recipient) => {
      let result = []

      const recursive = (commit, recipient) => {
         commit.map(({ author: { id, nickname }, content, commit }) => {
            result.push({ sender: nickname, id, content, recipient })
            if (commit.length) recursive(commit, nickname)
         })
      }
      
      recursive(commit, recipient)

      return result
   }

   const createCommentId = ({ author: { id }, timestamp }) => (id + timestamp)

   return commit.map(item => {
      let childComments = normalize(item.commit, item.author.nickname)
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
   let post = alterPost(data)

   return { post, comments }
}

module.exports = {
   alterSinglePosts,
   alterSolePost
}