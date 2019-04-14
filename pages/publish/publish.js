Page({
   data: {
      disabled: true,
      imagePaths: [],
      showImagePicker: true
   },
   onLoad() {

   },
   handleInput({ detail: { value } }) {
      if (value.trim() && this.data.disabled) this.setData({ disabled: false })
      if (!value.trim() && !this.data.disabled) this.setData({ disabled: true })
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