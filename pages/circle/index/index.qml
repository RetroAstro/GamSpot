<view class="container">
   <view class="popular flex-start">热门圈子</view>
   <view class="main skeleton">
      <skeleton selector="skeleton" showSkeleton="{{showSkeleton}}"></skeleton>
      <block qq:for="{{circles}}" qq:key="{{index}}">
            <template is="single" data="{{item}}" />
      </block>
   </view>
</view>

<template name="single">
   <view class="single-box">
      <navigator hover-class="none" class="flex-start" open-type="navigateTo" url="/pages/circle/single/single?circleId={{item.id}}">
         <preload class="avatar skeleton-radius" src="{{item.avatarUrl}}" bindloaded="handleLoaded"></preload>
         <view class="info flex-col-between">
            <view class="name skeleton-rect">{{item.name}}</view>
            <view class="data-box flex-start skeleton-rect">
               <view class="joined">{{item.joinCount}}个人已加入</view>
               <view class="post">{{item.talkingCount}}条邮话</view>
            </view>
         </view>
      </navigator>
      <view class="gap flex-start">
         <view class="left"></view>
         <view class="right flex-center">
            <view class="line"></view>
         </view>
      </view>
   </view>
</template>