const { actions, subscribe } = require('../../../store/index')
const { postItems } = require('../../../mock/index')

Page({
   data: {
      mark: '',
      info: {},
      showSkeleton: true,
      postItems
   },
   onLoad({ params }) {
      qq.hideTabBar()

      this.connectStore()
      this.renderCircleInfo(JSON.parse(params))
   },
   onUnload() {
      qq.showTabBar()
      
      this.unsubscribe()
   },
   onNavigate({ detail: { data } }) {
      qq.navigateTo({ url: `/pages/circle/detail/detail?tag=${data}` })
   },
   onTap() {
      this.setData({
         mark: 'join'
      }, () => actions.joinCircle(this.data.info.id))
   },
   connectStore() {
      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))
   },
   renderCircleInfo(info) {
      this.setData({ info }, () => actions.fetchSinglePosts(this.data.info.id))
   },
   handleState({ circles, posts, circlePosts }) {
      this.updateCircleInfo(circles)
      this.updatePosts(posts, circlePosts)
   },
   updateCircleInfo(circles) {
      circles.map(item => item.id == this.data.info.id ? this.setData({ info: { ...item }, showSkeleton: false }) : null)
   },
   updatePosts(posts, circlePosts) {
      let postIds = circlePosts[this.data.info.id] || []

      this.setData({
         postItems: postIds.map(id => posts.byId[id])
      })
   }
})