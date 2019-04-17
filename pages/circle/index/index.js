const { getCircles } = require('../../../api/index')

Page({
   data: {
      circles: []
   },
   onLoad() {
      getCircles()
      .then(({ data }) => this.setData({ circles: data }))
   },
   onNavigate(e) {
      let item = e.currentTarget.dataset.item
      
      qq.navigateTo({ url: `/pages/circle/single/single?params=${JSON.stringify(item)}` })
   }
})