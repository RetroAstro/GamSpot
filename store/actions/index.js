const {
   getCircles,
   getSoleCircle,
   getPopularPosts,
   getSinglePosts,
   sendCircleId,
   getSolePost,
} = require('../../api/index')

const {
   receiveCircles,
   receiveSoleCircle,
   receivePopularPosts,
   addPopularPosts,
   receiveSinglePosts,
   addSinglePosts,
   joinSuccess,
   addNewPost,
   receiveSolePost,
   likeSuccess,
   collectSuccess
} = require('./creators')

const fetchCircles = () => dispatch => {
   getCircles()
   .then(data => dispatch(receiveCircles(data)))
}

const fetchSoleCircle = id => dispatch => {
   getSoleCircle(id)
   .then(data => dispatch(receiveSoleCircle(data)))
}

const fetchPopularPosts = (page = 1) => dispatch => {
   getPopularPosts(page)
   .then(data => page == 1 ? dispatch(receivePopularPosts(data)) : dispatch(addPopularPosts(data, page)))
}

const fetchSinglePosts = (id, page = 1) => dispatch => {
   getSinglePosts(id, page)
   .then(data => {
      if (page == 1) {
         dispatch(receiveSinglePosts(id, data)) && dispatch(fetchSoleCircle(id))
      } else {
         dispatch(addSinglePosts(id, data, page))
      }
   })
}

const joinCircle = id => dispatch => {
   sendCircleId(id)
   .then(() => dispatch(joinSuccess(id)))
}

const publishNewPost = id => dispatch => dispatch(addNewPost(id)) && dispatch(fetchSinglePosts(id))

const fetchSolePost = id => dispatch => {
   getSolePost(id)
   .then(data => dispatch(receiveSolePost(data)))
}

const likeAction = (id, isAgree) => dispatch => dispatch(likeSuccess(id, isAgree))

const collectAction = (id, isCollection) => dispatch => dispatch(collectSuccess(id, isCollection))

module.exports = {
   fetchCircles,
   fetchPopularPosts,
   fetchSinglePosts,
   joinCircle,
   publishNewPost,
   fetchSolePost,
   likeAction,
   collectAction
}