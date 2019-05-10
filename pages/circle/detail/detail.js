const { actions, subscribe, getState } = require('../../../store/index')
const { comments } = require('../../../mock/index')

Page({
   props: {
      tag: '',
      post: '',
      circleId: ''
   },
   data: {
      post: '',
      comments,
      isFixed: false,
      showReply: false,
      showSkeleton: true
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
         this.setData({ showReply: true })
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
   updatePost(posts) {
      let post = posts.byId[this.props.post.id]

      return {
         ...post,
         images: this.props.post.images
      }
   },
   updateComments(comments, postComments) {
      return {
         comments: postComments[this.props.post.id].map(id => comments[id])
      }
   },
   hideSkeleton() {
      this.setData({ showSkeleton: false })
   },
   initialize(props) {
      this.setProps(props)
      this.renderPost()
      this.handleScroll()
   },
   setProps(props) {
      this.props = { ...props }
   },
   renderPost() {
      this.setData({ post: this.props.post }, () => actions.fetchSolePost(this.props.post.id))
   },
   handleScroll() {
      if (this.props.tag === 'comment') {
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