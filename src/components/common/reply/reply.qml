<view class="reply-box {{showReply ? 'active' : ''}}" bindtransitionend="handleFixed">
   <view class="header">
      <view class="lay flex-center">
         <image class="close" mode="scaleToFill" src="../../../images/close.png" bindtap="hideReplyBox"></image>
         <view class="send {{disabled ? 'disabled' : ''}}" bindtap="postComment">发送</view>
      </view>
   </view>
   <block qq:if="{{showReply}}">
      <view class="reply-area">
         <textarea fixed auto-height maxlength="150" placeholder-class="placeholder" placeholder="回复: {{recipient.nickname}} (最多150字)" bindinput="handleInput" />
      </view>
   </block>
</view>