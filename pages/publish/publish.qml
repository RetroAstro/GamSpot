<view class="container">
   <view class="tag-box flex-start">
      <view class="circle-name flex-center">#失物招领#</view>
   </view>
   <view class="content-box">
      <textarea
         auto-height
         maxlength="300"
         placeholder="发布新动态... (最多300字)"
         placeholder-class="placeholder"
         bindinput="handleInput"
      ></textarea>
   </view>
   <view class="upload-box">
      <block qq:for="{{imagePaths}}" qq:key="index">
         <view>
            <image mode="scaleToFill" src="{{item}}"></image>
         </view>
      </block>
      <block qq:if="{{showImagePicker}}">
         <view class="image-picker" bindtap="chooseImage">
            <image mode="scaleToFill" src="../../images/increment.png"></image>
         </view>
      </block>
   </view>
   <view class="publish-box flex-center {{disabled ? 'disabled' : ''}}">发布</view>
</view>