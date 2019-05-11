<view class="container {{isFixed ? 'active' : ''}}">
   <view class="post-box">
      <block qq:if="{{post}}">
         <post item="{{post}}" isSole=true bindnavigate="onNavigate"></post>
      </block>
   </view>
   <view class="comment-box skeleton">
      <block qq:if="{{post}}">
         <skeleton selector="skeleton" showSkeleton="{{showSkeleton}}" setStyle="min-height: 760rpx;"></skeleton>
         <block qq:for="{{comments}}" qq:key="commentId">
            <comment item="{{item}}" bindcomment="postComment"></comment>
         </block>
      </block>
   </view>
   <block qq:if="{{!comments.length}}">
      <view class="no-comment">
         <image mode="scrollToFill" src="../../../images/no-comment.png"></image>
         <text>暂无评论</text>
      </view>
   </block>
   <reply showReply={{showReply}} bindreply="onReply" recipient="{{recipient}}" circleId="{{circleId}}" postId="{{post ? post.id : ''}}"></reply>
</view>