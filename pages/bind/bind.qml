<view class="container">
   <view class="banner-box">
      <image class="banner" mode="scaleToFill" src="../../images/banner.png">
      </image>
   </view>
   <form bindsubmit="formSubmit" class="binding-box flex-col-start">
      <view class="flex-between">
         <image class="nickname" mode="scaleToFill" src="../../images/nickname.png">
         </image>
         <input name="nickname" class="binding-input" placeholder="昵称" placeholder-style="color:#e5e5e5"/>
      </view>
      <view class="flex-between">
         <image class="stuid" mode="scaleToFill" src="../../images/stuid.png">
         </image>
         <input name="stuid" class="binding-input" placeholder="学号" placeholder-style="color:#e5e5e5"/>
      </view>
      <view class="flex-between">
         <image class="identity" mode="scaleToFill" src="../../images/identity.png">
         </image>
         <input name="identification" class="binding-input" placeholder="身份证后六位" placeholder-style="color:#e5e5e5"/>
      </view>
      <button form-type="submit" class="binding-btn flex-center">绑定</button>
   </form>
</view>