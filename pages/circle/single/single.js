const { actions, subscribe } = require('../../../store/index')

Page({
   data: {
      mark: '',
      info: {},
      postItems: []
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
   handleState({ circles, posts, circlePost }) {
      this.updateCircleInfo(circles)
      this.updatePosts(posts, circlePost)
   },
   updateCircleInfo(circles) {
      circles.map(item => item.id === this.data.info.id ? this.setData({ info: { ...item } }) : null)
   },
   updatePosts(posts, circlePost) {
      let result = circlePost.allIds
         .filter(id => circlePost.byId[id].circleId === this.data.info.id).map(id => posts.byId[id])

      this.setData({ postItems: result })
   }
})