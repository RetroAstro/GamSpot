Page({
   data: {
      imagePaths: [],
      showImagePicker: true
   },
   onLoad() {

   },
   chooseImage() {
      let self = this
      qq.chooseImage({
         success({ tempFilePaths }) {
            let imagePaths = self.data.imagePaths.concat(tempFilePaths)
            imagePaths.length === 9 ? self.setData({ imagePaths, showImagePicker: false }) : self.setData({ imagePaths })
         }
      })
   }
})