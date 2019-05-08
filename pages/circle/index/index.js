const { actions, subscribe } = require('../../../store/index')
const { circles } = require('../../../mock/index')

Page({
   props: {
      loadedNum: 0
   },
   data: {
      showSkeleton: true,
      circles
   },
   onLoad() {
      this.connectStore()
      this.initialize()
   },
   onUnload() {
      this.unsubscribe()
   },
   initialize() {
      actions.fetchCircles()
   },
   connectStore() {
      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))
   },
   handleState({ circles }) {
      this.setData({ circles })
   },
   handleLoaded() {
      this.props.loadedNum++
      
      if (this.props.loadedNum == this.data.circles.length) this.setData({ showSkeleton: false })
   },
   onNavigate(e) {
      let item = e.currentTarget.dataset.item
      
      qq.navigateTo({ url: `/pages/circle/single/single?params=${JSON.stringify(item)}` })
   }
})