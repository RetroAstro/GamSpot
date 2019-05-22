<view class="comment">
   <view class="header flex-between">
      <view class="left flex-start">
         <block qq:if="{{item.author.gender == 1}}">
            <image class="avatar skeleton-radius" mode="scaleToFill" src="../../../../images/boy.png"></image>
         </block>
         <block qq:else>
            <image class="avatar skeleton-radius" mode="scaleToFill" src="../../../images/girl.png"></image>
         </block>
         <view class="info flex-col-between skeleton-rect">
            <view class="name">{{item.author.nickname}}</view>
            <view class="time">{{item.createdTime}}</view>
         </view>
      </view>
      <view class="right flex-end" bindtap="tapLike">
         <!-- <image
            class="like {{active ? 'active': ''}}"
            mode="scaleToFill"
            src="{{isAgree ? '../../../images/active-like.png' : '../../../images/like.png'}}"
         ></image>
         <view class="number">{{agreeCount}}</view> -->
      </view>
   </view>
   <view class="content" bindtap="onReply" data-pid="{{item.id}}" data-nickname="{{item.author.nickname}}">
      <text class="skeleton-rect">{{item.content}}</text>
   </view>
   <block qq:if="{{item.childComments.length}}">
      <view class="reply">
         <view class="layer skeleton-rect">
            <block qq:for="{{item.childComments}}" qq:key="id">
               <view class="box" bindtap="onReply" data-pid="{{item.id}}" data-nickname="{{item.sender}}">
                  <text class="flex-start" style="float: left;">
                     <text class="sender user">{{item.sender}}</text>
                     <text class="tiny">回复</text>
                     <text class="recipient user">{{item.recipient}}</text>
                  </text>
                  <text class="words">：{{item.content}}</text>
               </view>
            </block>
         </view>
      </view>
   </block>
</view>