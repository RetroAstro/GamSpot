const { actions, subscribe, getState } = require('../../../store/index')
const { comments } = require('../../../mock/index')

Page({
   data: {
      tag: '',
      post: '',
      circleId: '',
      recipient: {},
      isFixed: false,
      showReply: false,
      showSkeleton: true,
      comments
   },
   onLoad({ params }) {
      this.connectStore()
      this.initialize(JSON.parse(decodeURIComponent(params)))
   },
   onUnload() {
      this.unsubscribe()
   },
   onNavigate({ detail: { data: { tag } } }) {
      if (tag === 'comment') {
         this.setData({
            showReply: true,
            recipient: { pid: this.data.post.id, nickname: this.data.post.author.nickname }
         })
      }
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
   postComment({ detail: { data } }) {
      this.setData({ showReply: true, recipient: data })
   },
   connectStore() {
      this.unsubscribe = subscribe(() => this.handleState(getState()))
   },
   handleState({ posts, comments, postComments }) {
      let data = {
         ...this.updatePost(posts),
         ...this.updateComments(comments, postComments)
      }

      this.setData(data, this.hideSkeleton)
   },
   hideSkeleton() {
      this.setData({ showSkeleton: false })
   },
   updatePost(posts) {
      let post = posts.byId[this.data.post.id]
      
      return {
         post: { ...post, images: this.data.post.images }
      }
   },
   updateComments(comments, postComments) {
      let commentIds = postComments[this.data.post.id]

      return {
         comments: commentIds ? commentIds.map(id => comments.byId[id]) : []
      }
   },
   initialize(data) {
      this.renderSolePost(data)
      this.handleScroll()
   },
   renderSolePost(data) {
      this.setData(data, () => actions.fetchSolePost(this.data.post.id))
   },
   handleScroll() {
      if (this.data.tag === 'comment') {
         setTimeout(this.scrollToComment, 1000)
      }
   },
   scrollToComment() {
      let query = qq.createSelectorQuery()
      
      query
      .select('.post-box')
      .boundingClientRect()
      .exec(([{ height }]) => qq.pageScrollTo({ scrollTop: height }))
   }
})