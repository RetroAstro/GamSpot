const { actions, subscribe, getState } = require('../../../store/index')
const { circles } = require('../../../mock/index')

Page({
   data: {
      circles,
      showSkeleton: true
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
      }, this.hideSkeleton)
   },
   hideSkeleton() {
      this.setData({ showSkeleton: false })
   }
})