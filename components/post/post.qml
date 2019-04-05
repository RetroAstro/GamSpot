<view class="post">
   <view class="user-box flex-start">
      <image class="avatar" mode="scaleToFill" src="../../images/icon.png"></image>
      <view class="info flex-col-between">
         <view class="name">疯狂的兔子🐰</view>
         <view class="time">16:30</view>
      </view>
   </view>
   <view class="content-box">
      拥有交互思维的视觉设计师，拥有了在产品层面讨论问
      题的能力，更多的交流能弥补信息不对称，帮助视觉设
      计更贴合需求，这个良性的促进，使设计师拥有更大的
      话语权。毕竟符合需求的设计才是好设计。
   </view>
   <view class="photo-box">
      <block qq:if="{{photos.length === 1}}">
         <template is="one" data="{{...photos[0]}}" />
      </block>
   </view>
   <view class="interact-box"></view>
</view>

<template name="one">
   <view class="layout-one">
      <block qq:if="{{ratio >= 1}}">
         <image class="row" mode="widthFix" src="{{url}}"></image>
      </block>
      <block qq:else>
         <image class="column" mode="widthFix" src="{{url}}"></image>
      </block>
   </view>
</template>