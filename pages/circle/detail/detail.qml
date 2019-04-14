<view class="container {{isFixed ? 'active' : ''}}">
   <view class="post-box">
      <post item="{{postItem}}" bindnavigate="onNavigate"></post>
   </view>
   <view class="comment-box">
      <comment item="{{commentItem}}"></comment>
      <comment item="{{commentItem}}"></comment>
   </view>
   <reply showReply={{showReply}} bindreply="onReply">
</view>