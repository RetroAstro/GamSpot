const { actions, subscribe, getState } = require('../../../store/index')
const { post, comments } = require('../../../mock/index')

Page({
   props: {
      tag: '',
      circleId: ''
   },
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
      this.setProps(tag, circleId)
      this.renderPost(post)
   },
   setProps(tag, circleId) {
      this.props = { tag, circleId }
   },
   renderPost(post) {
      this.setData({ post })
   },
   handleScroll() {
      if (this.props.tag === 'comment') setTimeout(this.scrollToComment, 800)
   },
   scrollToComment() {
      let query = qq.createSelectorQuery()
      
      query
      .select('.post-box')
      .boundingClientRect()
      .exec(([{ height }]) => qq.pageScrollTo({ scrollTop: height }))
   }
})