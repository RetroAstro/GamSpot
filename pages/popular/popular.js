const { actions, subscribe, getState } = require('../../store/index')
const { postItems } = require('../../mock/index')

Page({
   props: {
      pageNum: 1
   },
   data: {
      showSkeleton: true,
      loading: false,
      loadedText: '',
      feedList: [postItems]
   },
   onLoad() {
      this.connectStore()
      this.initialize()
   },
   onUnload() {
      this.unsubscribe()
   },
   onPullDownRefresh() {
      this.props.pageNum = 1

      this.setData({ loadedText: '' }, () => actions.fetchPopularPosts())
   },
   onReachBottom() {
      if (!this.data.loading) {
         this.setData({ loading: true }, this.addPopularPosts)
      }
   },
   onNavigate({ detail: { data } }) {
      
   },
   connectStore() {
      this.unsubscribe = subscribe(() => this.handleState(getState()))
   },
   initialize() {
      actions.fetchPopularPosts()
   },
   addPopularPosts() {
      if (!this.data.showSkeleton) {
         actions.fetchPopularPosts(++this.props.pageNum)
      }
   },
   handleState(state) {
      let data = this.updatePosts(state)
      
      this.setData(data, this.hideSkeleton)
   },
   hideSkeleton() {
      this.setData({ showSkeleton: false })
   },
   updatePosts({ posts, popularPosts }) {
      let cursor = this.props.pageNum - 1
      let postIds = popularPosts[cursor]
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