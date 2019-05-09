<view class="container {{isFixed ? 'active' : ''}}">
   <view class="post-box">
      <post item="{{post}}" isSole=true bindnavigate="onNavigate" bindscroll="handleScroll"></post>
   </view>
   <view class="comment-box skeleton">
      <skeleton selector="skeleton" showSkeleton="{{showSkeleton}}"></skeleton>
      <block qq:for="{{comments}}" qq:key="commentId">
         <comment item="{{item}}"></comment>
      </block>
   </view>
   <block qq:if="{{!showSkeleton}}">
      <reply showReply={{showReply}} bindreply="onReply"></reply>
   </block>
</view>