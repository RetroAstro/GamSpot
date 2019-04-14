<view class="container {{isFixed ? 'active' : ''}}">
   <view class="post-box">
      <post item="{{postItem}}" bindnavigate="onNavigate"></post>
   </view>
   <view class="comment-box">
      <comment item="{{commentItem}}"></comment>
      <comment item="{{commentItem}}"></comment>
   </view>
   <view class="reply-box {{showReply ? 'active' : ''}}" bindtransitionend="handleFixed">
      <view class="header">
         <view class="lay flex-center">
            <image class="close" mode="scaleToFill" src="../../../images/close.png" bindtap="hideReplyBox"></image>
            <view class="send">发送</view>
         </view>
      </view>
      <view class="reply-area">
         <textarea maxlength="150" placeholder="回复想那些阿布：(最多150字)" placeholder-class="placeholder" auto-focus></textarea>
      </view>
   </view>
</view>