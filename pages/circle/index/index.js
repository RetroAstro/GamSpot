const { actions, subscribe, getState } = require('../../../store/index')
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
      this.unsubscribe = subscribe(() => this.handleState(getState()))
   },
   handleState({ circles }) {
      this.setData({
         circles: circles.allIds.map(id => circles.byId[id])
      })
   },
   handleLoaded() {
      this.props.loadedNum++

      if (this.props.loadedNum == this.data.circles.length) this.setData({ showSkeleton: false })
   }
})