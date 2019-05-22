<view class="container">
   <view class="checked-box flex-end">
      <view class="checked">一键已读</view>
   </view>
   <view class="notice-box">
      <block qq:for="{{notices}}" qq:key="{{index}}">
         <view class="notice flex-start {{item.checked ? 'checked' : ''}}">
            <block qq:if="{{item.type === 'bell'}}">
               <image mode="scaleToFill" src="../../images/notice-bell.png"></image>
            </block>
            <block qq:elif="{{item.type === 'like'}}">
               <image mode="scaleToFill" src="../../images/notice-like.png"></image>
            </block>
            <block qq:else>
               <image mode="scaleToFill" src="../../images/notice-comment.png"></image>
            </block>
            <view class="info flex-col-between">
               <view class="message">
                  <view class="user">{{item.name}}</view>
                  {{default[item.type]}}
               </view>
               <view class="time">{{item.time}}</view>
            </view>
         </view>
      </block>
   </view>
</view>