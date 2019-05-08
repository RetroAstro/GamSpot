const { actions, subscribe, getState } = require('../../../store/index')
const { post, comments } = require('../../../mock/index')

Page({
   data: {
      post,
      comments,
      isFixed: false,
      showReply: false,
      showSkeleton: true
   },
   onLoad({ params }) {
      this.connectStore()
      this.initialize(JSON.parse(params))
   },
   onUnload() {
      this.unsubscribe()
   },
   onNavigate({ detail: { data: { tag } } }) {
      if (tag === 'comment') this.setData({ showReply: true })
   },
   onReply({ detail: { data } }) {
      let action = this.getAction(data)

      action.run()
   },
   getAction(key) {
      let actions = {
         hide: () => this.setData({ showReply: false }),
         fixed: () => this.setData({ isFixed: !this.data.isFixed })
      }
      
      return { run: actions[key] }
   },
   connectStore() {
      this.unsubscribe = subscribe(() => this.handleState(getState()))
   },
   handleState() {
      
   },
   initialize({ tag, post, circleId }) {
      this.handleScroll(tag)
      this.renderPost(post, circleId)
   },
   renderPost(post, circleId) {
      this.setData({ post: { ...post, circleId } })
   },
   handleScroll(tag) {
      if (tag === 'comment') this.scrollToComment()
   },
   scrollToComment() {
      let query = qq.createSelectorQuery()
      
      query
      .select('.post-box')
      .boundingClientRect()
      .exec(([{ height }]) => qq.pageScrollTo({ scrollTop: height }))
   }
})