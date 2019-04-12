<view class="comment">
   <view class="header flex-between">
      <view class="left flex-start">
         <block qq:if="{{item.gender === 1}}">
            <image class="avatar" mode="scaleToFill" src="../../images/boy.png"></image>
         </block>
         <block qq:else>
            <image class="avatar" mode="scaleToFill" src="../../images/girl.png"></image>
         </block>
         <view class="info flex-col-between">
            <view class="name">{{item.nickname}}</view>
            <view class="time">{{item.createdTime}}</view>
         </view>
      </view>
      <view class="right flex-end">
         <image class="like" mode="scaleToFill" src="{{item.isAgree ? '../../images/active-like.png' : '../../images/like.png'}}"></image>
         <view class="number">{{item.agreeCount}}</view>
      </view>
   </view>
   <view class="content">{{item.content}}</view>
   <block qq:if="{{item.comments.length}}">
      <view class="reply">
         <block qq:for="{{item.comments}}" qq:key="index">
            <view class="box">
               <view style="float: left;" class="flex-start">
                  <view class="sender user">{{item.sender}}</view>
                  <view class="tiny">回复</view>
                  <view class="recipient user">{{item.recipient}}</view>
               </view>
               <view class="words">：{{item.content}}</view>
            </view>
         </block>
      </view>
   </block>
</view>