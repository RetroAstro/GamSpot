<view class="container">
   <view class="header">
      <view class="circle-box flex-start">
         <view class="icon-box">
            <image class="icon" mode="scaleToFill" src="{{info.avatarUrl}}"></image>
         </view>
         <view class="content flex-col-between">
            <view class="title">{{info.name}}</view>
            <view class="flex-start">
               <view class="member">{{info.joinCount}}个圈友</view>
               <view class="posts flex-start">
                  <view class="talking ellipsis">{{info.talkingCount}}</view>
                  <view>条邮话</view>
               </view>
            </view>
         </view>
      </view>
      <view class="sticky">
         <image class="message" mode="scaleToFill" src="../../../images/message.png"></image>
         <navigator class="upon-box flex-center" open-type="navigate" url="/pages/circle/upon/upon" hover-class="none">
            <view class="upon flex-start">
               <view class="title">置顶</view>
               <view class="content ellipsis">这里由创建者编辑、创建</view>
            </view>
         </navigator>
      </view>
   </view>
   <view class="main">
      <view class="post-box skeleton">
         <skeleton selector="skeleton" showSkeleton="{{showSkeleton}}" setStyle="min-height: 1354rpx;"></skeleton>
         <view class="top-bar"></view>
         <block qq:for="{{postItems}}" qq:key="index">
            <post item="{{item}}" bindnavigate="onNavigate"></post>
         </block>
      </view>
   </view>
   <block qq:if="{{!info.isJoin}}">
      <view class="join-box {{mark === 'join' ? 'disabled' : ''}}" bindtap="onTap">
         <image class="join" mode="scaleToFill" src="../../../images/join.png"></image>
      </view>
   </block>
   <navigator
      hover-class="none"
      open-type="navigateTo"
      class="publish-box {{info.isJoin ? 'active' : ''}}"
      url="/pages/publish/publish?id={{info.id}}&name={{info.name}}"
   >
      <image class="publish" mode="scaleToFill" src="../../../images/publish.png"></image>
   </navigator>
</view>