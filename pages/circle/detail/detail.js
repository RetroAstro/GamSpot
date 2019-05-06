Page({
   data: {
      isFixed: false,
      showReply: false
   },
   onLoad({ tag }) {
      this.handleScroll(tag)
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