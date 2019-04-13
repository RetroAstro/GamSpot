<view class="container">
   <view class="header">
      <view class="circle-box flex-start">
         <view class="icon-box">
            <image class="icon" mode="scaleToFill" src="../../../images/icon.png"></image>
         </view>
         <view class="content flex-col-between">
            <view class="title">重邮小公告</view>
            <view class="member">4567个圈友</view>
         </view>
      </view>
      <view class="sticky">
         <image class="message" mode="scaleToFill" src="../../../images/message.png"></image>
         <navigator class="upon-box flex-center" open-type="navigate" url="/pages/circle/upon/upon">
            <view class="upon flex-start">
               <view class="title">置顶</view>
               <view class="content ellipsis">这里由创建者编辑、创建</view>
            </view>
         </navigator>
      </view>
   </view>
   <view class="main">
      <view class="post-box">
         <view class="top-bar"></view>
         <post item="{{postItem}}" bindnavigate="onNavigate"></post>
         <post item="{{postItem}}" bindnavigate="onNavigate"></post>
      </view>
   </view>
   <view class="join-box {{mark === 'join' ? 'active' : ''}}" bindtap="onTap">
      <image class="join" mode="scaleToFill" src="../../../images/join.png"></image>
   </view>
   <navigator class="publish-box {{mark === 'publish' ? 'active' : ''}}" open-type="navigateTo" url="/pages/publish/publish">
      <image class="publish" mode="scaleToFill" src="../../../images/publish.png"></image>
   </navigator>
</view>