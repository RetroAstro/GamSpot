<view class="container">
   <view class="banner-box">
      <image class="banner" mode="scaleToFill" src="../../images/banner.png">
      </image>
   </view>
   <form bindsubmit="formSubmit" class="binding-box flex-col-start">
      <view class="nickname flex-between">
         <image mode="scaleToFill" src="../../images/nickname.png"></image>
         <input bindfocus="onFocus" data-mark="nickname" name="nickname" class="binding-input" placeholder="昵称" placeholder-style="color:#e5e5e5" maxlength="12"/>
      </view>
      <view class="line-box">
         <view class="line"></view>
         <view class="zelma {{mark === 'nickname' ? 'active' : ''}}"></view>
      </view>
      <view class="stuid flex-between">
         <image mode="scaleToFill" src="../../images/stuid.png"></image>
         <input type="number" bindfocus="onFocus" data-mark="stuid" name="stuid" class="binding-input" placeholder="学号" placeholder-style="color:#e5e5e5" maxlength="10"/>
      </view>
      <view class="line-box">
         <view class="line"></view>
         <view class="zelma {{mark === 'stuid' ? 'active' : ''}}"></view>
      </view>
      <view class="identity flex-between">
         <image mode="scaleToFill" src="../../images/identity.png"></image>
         <input password bindfocus="onFocus" data-mark="identity" name="identification" class="binding-input" placeholder="身份证后六位" placeholder-style="color:#e5e5e5" maxlength="6"/>
      </view>
      <view class="line-box">
         <view class="line"></view>
         <view class="zelma {{mark === 'identity' ? 'active' : ''}}"></view>
      </view>
      <button form-type="submit" class="binding-btn flex-center">绑定</button>
   </form>
</view>