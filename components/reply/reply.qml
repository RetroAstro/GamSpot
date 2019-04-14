<view class="reply-box {{showReply ? 'active' : ''}}" bindtransitionend="handleFixed">
   <view class="header">
      <view class="lay flex-center">
         <image class="close" mode="scaleToFill" src="../../images/close.png" bindtap="hideReplyBox"></image>
         <view class="send {{disabled ? 'disabled' : ''}}">发送</view>
      </view>
   </view>
   <view class="reply-area">
      <textarea
         auto-focus
         maxlength="150"
         placeholder-class="placeholder"
         placeholder="回复想那些阿布：(最多150字)"
         bindinput="handleInput"
      ></textarea>
   </view>
</view>