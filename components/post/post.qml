<view class="post">
   <view bindtap="tapPost">
      <view class="user-box flex-start">
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
         <block qq:if="{{item.isTop}}">
            <view class="upon-tag">
               <view class="upon flex-center">置顶</view>
            </view>
         </block>
         <block qq:if="{{item.circleName}}">
            <view class="circle-tag">
               <view class="circle flex-center">#{{item.circleName}}#</view>
            </view>
         </block>
      </view>
      <view class="content-box">{{item.content}}</view>
      <view class="photo-box">
         <block qq:if="{{item.images.length === 1}}">
            <template is="one" data="{{...item.images[0]}}" />
         </block>
         <block qq:elif="{{item.images.length >= 2 && item.images.length <= 4}}">
            <template is="two" data="{{images: item.images, type: 'layout-two'}}" />
         </block>
         <block qq:else>
            <template is="two" data="{{images: item.images, type: 'layout-three'}}" />
         </block>
      </view>
   </view>
   <view class="interact-box flex-end">
      <view class="like flex-start" bindtap="tapInteract" data-event="like">
         <image
            class="{{like.active ? 'active': ''}}"
            mode="scaleToFill"
            src="{{like.isAgree ? '../../images/active-like.png' : '../../images/like.png'}}"
         ></image>
         <view class="number">{{like.agreeCount}}</view>
      </view>
      <view class="comment flex-start" bindtap="tapComment">
         <image mode="scaleToFill" src="../../images/comment.png"></image>
         <view class="number">{{item.commitCount}}</view>
      </view>
      <view class="collect flex-start" bindtap="tapInteract" data-event="collect">
         <image
            class="{{collect.active ? 'active' : ''}}"
            mode="scaleToFill"
            src="{{collect.isCollection ? '../../images/active-collect.png' : '../../images/collect.png'}}"
         ></image>
         <view class="number">{{collect.collectionCount}}</view>
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
         <block qq:for="{{images}}" qq:key="index">
            <image mode="scaleToFill" src="{{item.url}}"></image>
         </block>
      </view>
   </view>
</template>