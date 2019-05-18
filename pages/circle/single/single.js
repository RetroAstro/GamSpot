const { actions, subscribe, getState } = require('../../../store/index')
const { postItems } = require('../../../mock/index')

Page({
   props: {
      pageNum: 1
   },
   data: {
      mark: '',
      info: {},
      showSkeleton: true,
      loading: false,
      loadedText: '',
      feedList: [postItems]
   },
   onLoad({ circleId }) {
      qq.hideTabBar()

      this.connectStore()
      this.initialize(circleId)
   },
   onUnload() {
      qq.showTabBar()
      
      this.unsubscribe()
   },
   onPullDownRefresh() {
      this.props.pageNum = 1

      this.setData({ loadedText: '' }, () => actions.fetchSinglePosts(this.data.info.id))
   },
   onReachBottom() {
      if (!this.data.loading) {
         this.setData({ loading: true }, this.addSinglePosts)
      }
   },
   onTap() {
      this.setData({ mark: 'join' }, () => actions.joinCircle(this.data.info.id))
   },
   onNavigate({ detail: { data } }) {
      let params = { ...data, circleId: this.data.info.id }

      qq.navigateTo({ url: `/pages/circle/detail/detail?params=${encodeURIComponent(JSON.stringify(params))}` })
   },
   connectStore() {
      this.unsubscribe = subscribe(() => this.handleState(getState()))
   },
   initialize(id) {
      this.setData({ info: { id } }, actions.fetchSinglePosts(id))
   },
   addSinglePosts() {
      if (!this.data.showSkeleton) {
         actions.fetchSinglePosts(this.data.info.id, ++this.props.pageNum)
      }
   },
   handleState({ circles, posts, circlePosts }) {
      let data = {
         ...this.updateCircleInfo(circles),
         ...this.updatePosts(posts, circlePosts)
      }
      
      this.setData(data, this.hideSkeleton)
   },
   hideSkeleton() {
      this.setData({ showSkeleton: false })
   },
   updateCircleInfo(circles) {
      return {
         info: circles.byId[this.data.info.id] || this.data.info
      }
   },
   updatePosts(posts, circlePosts) {
      let cursor = this.props.pageNum - 1
      let postIds = circlePosts[this.data.info.id][cursor]
      let postItems = postIds.map(id => posts.byId[id])
      
      if (this.noMorePosts(postIds)) {
         this.props.pageNum -= 1

         return { loadedText: '没有更多啦 ~' }
      } else {
         qq.stopPullDownRefresh()

         return {
            loading: false,
            ...(cursor == 0 ? { feedList: [postItems] } : { [`feedList[${cursor}]`]: postItems })
         }
      }
   },
   noMorePosts(postIds) {
      return (!postIds.length && this.props.pageNum > 1)
   }
})