<view class="comment">
   <view class="header flex-between">
      <view class="left flex-start">
         <block qq:if="{{item.author.gender == 1}}">
            <image class="avatar skeleton-radius" mode="scaleToFill" src="../../../images/boy.png"></image>
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
         <image
            class="like {{active ? 'active': ''}}"
            mode="scaleToFill"
            src="{{isAgree ? '../../../images/active-like.png' : '../../../images/like.png'}}"
         ></image>
         <view class="number">{{agreeCount}}</view>
      </view>
   </view>
   <view class="content">
      <text class="skeleton-rect">{{item.content}}</text>
   </view>
   <view class="reply">
      <block qq:for="{{item.childComments}}" qq:key="id">
         <view class="box skeleton-rect">
            <view style="float: left;" class="flex-start">
               <view class="sender user">{{item.sender}}</view>
               <view class="tiny">回复</view>
               <view class="recipient user">{{item.recipient}}</view>
            </view>
            <view class="words">：{{item.content}}</view>
         </view>
      </block>
   </view>
</view>