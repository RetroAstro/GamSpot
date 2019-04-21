const { actions, subscribe } = require('../../../store/index')

Page({
   data: {
      circles: []
   },
   onLoad() {
      this.connectStore()

      actions.fetchCircles()
   },
   onUnload() {
      this.unsubscribe()
   },
   connectStore() {
      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))
   },
   handleState({ circles }) {
      this.setData({ circles })
   },
   onNavigate(e) {
      let item = e.currentTarget.dataset.item
      
      qq.navigateTo({ url: `/pages/circle/single/single?params=${JSON.stringify(item)}` })
   }
})