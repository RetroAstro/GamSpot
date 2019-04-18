const { actions, subscribe } = require('../../../store/index')

Page({
   data: {
      circles: []
   },
   onLoad() {
      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))

      actions.fetchCircles()
   },
   onUnload() {
      this.unsubscribe()
   },
   handleState({ circles }) {
      this.setData({ circles })
   },
   onNavigate(e) {
      let item = e.currentTarget.dataset.item
      
      qq.navigateTo({ url: `/pages/circle/single/single?params=${JSON.stringify(item)}` })
   }
})