<view class="container">
   <view class="popular flex-start">热门圈子</view>
   <view class="main">
      <block qq:for="{{circles}}" qq:key="index">
            <template is="single" data="{{...item}}" />
      </block>
   </view>
</view>

<template name="single">
   <view class="single-box">
      <view class="flex-start" bindtap="onNavigate">
         <image class="avatar" mode="scaleToFill" src="{{avatar}}"></image>
         <view class="info flex-col-between">
            <view class="name">{{name}}</view>
            <view class="data-box flex-start">
               <view class="joined">{{joined}}个人已加入</view>
               <view class="post">{{post}}条邮话</view>
            </view>
         </view>
      </view>
      <view class="gap flex-start">
         <view class="left"></view>
         <view class="right flex-center">
            <view class="line"></view>
         </view>
      </view>
   </view>
</template>