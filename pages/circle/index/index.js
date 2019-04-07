Page({
   data: {
      mark: 'join',
      photos: [
         {
            ratio: 1,
            url: '../../images/row.jpg'
         }
      ]
   },
   onTap() {
      this.setData({
         mark: 'publish'
      })
   }
})