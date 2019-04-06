<view class="post">
   <view class="user-box flex-start">
      <image class="avatar" mode="scaleToFill" src="../../images/icon.png"></image>
      <view class="info flex-col-between">
         <view class="name">疯狂的兔子🐰</view>
         <view class="time">16:30</view>
      </view>
   </view>
   <view class="content-box">拥有交互思维的视觉设计师，拥有了在产品层面讨论问题的能力，更多的交流能弥补信息不对称，帮助视觉设计更贴合需求，这个良性的促进，使设计师拥有更大的话语权。毕竟符合需求的设计才是好设计。</view>
   <view class="photo-box">
      <block qq:if="{{photos.length === 1}}">
         <template is="one" data="{{...photos[0]}}" />
      </block>
      <block qq:elif="{{photos.length >= 2 && photos.length <= 4}}">
         <template is="two" data="{{photos, type: 'layout-two'}}" />
      </block>
      <block qq:else>
         <template is="two" data="{{photos, type: 'layout-three'}}" />
      </block>
   </view>
   <view class="interact-box flex-end">
      <view class="like flex-start">
         <image mode="scaleToFill" src="../../images/active-like.png"></image>
         <view class="number">752</view>
      </view>
      <view class="comment flex-start">
         <image mode="scaleToFill" src="../../images/comment.png"></image>
         <view class="number">389</view>
      </view>
      <view class="collect flex-start">
         <image mode="scaleToFill" src="../../images/active-collect.png"></image>
         <view class="number">879</view>
      </view>
   </view>
</view>

<template name="one">
   <view class="layout-one flex-center">
      <block qq:if="{{ratio >= 1}}">
         <image class="row" mode="widthFix" src="{{url}}"></image>
      </block>
      <block qq:else>
         <image class="column" mode="widthFix" src="{{url}}"></image>
      </block>
   </view>
</template>

<template name="two">
   <view class="{{type}}">
      <view class="flex-box">
         <block qq:for="{{photos}}" qq:key="index">
            <image mode="scaleToFill" src="{{item.url}}"></image>
         </block>
      </view>
   </view>
</template>