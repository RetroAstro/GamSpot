const { actions, subscribe } = require('../../../store/index')

Page({
   props: {
      tag: '',
      circleId: ''
   },
   data: {
      isFixed: false,
      showReply: false
   },
   onLoad({ params }) {
      this.connectStore()
      this.initialize(JSON.parse(params))
   },
   onUnload() {
      this.unsubscribe()
   },
   onNavigate({ detail: { data } }) {
      data === 'comment' ? this.setData({ showReply: true }) : null
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
      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))
   },
   handleState() {
      
   },
   initialize(params) {
      this.props = { ...params }

      // actions.fetchSolePost()
   },
   scrollToComment() {
      let query = qq.createSelectorQuery()
      
      query
      .select('.post-box')
      .boundingClientRect()
      .exec(([{ height }]) => qq.pageScrollTo({ scrollTop: height }))
   }
})