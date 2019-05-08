<view class="post">
   <view class="user-box flex-start">
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
      <block qq:if="{{item.isTop}}">
         <view class="upon-tag">
            <view class="upon flex-center">置顶</view>
         </view>
      </block>
      <block qq:if="{{item.circleName}}">
         <view class="circle-tag" bindtap="tapCircle">
            <view class="circle flex-center">#{{item.circleName}}#</view>
         </view>
      </block>
   </view>
   <view class="content-box" bindtap="tapPost">
      <text class="skeleton-rect">{{item.content}}</text>
   </view>
   <view class="photo-box">
      <block qq:if="{{imageItems.length === 1}}">
         <template is="one" data="{{...imageItems[0]}}" />
      </block>
      <block qq:elif="{{imageItems.length >= 2 && imageItems.length <= 4}}">
         <template is="two" data="{{images: imageItems, type: 'layout-two'}}" />
      </block>
      <block qq:else>
         <template is="two" data="{{images: imageItems, type: 'layout-three'}}" />
      </block>
   </view>
   <view class="interact-box flex-end">
      <view class="like flex-start skeleton-rect" bindtap="tapInteract" data-event="like">
         <image
            class="{{like.active ? 'active': ''}}"
            mode="scaleToFill"
            src="{{like.isAgree ? '../../../images/active-like.png' : '../../../images/like.png'}}"
         ></image>
         <view class="number">{{like.agreeCount}}</view>
      </view>
      <view class="comment flex-start skeleton-rect" bindtap="tapComment">
         <image mode="scaleToFill" src="../../../images/comment.png"></image>
         <view class="number">{{item.commitCount}}</view>
      </view>
      <view class="collect flex-start skeleton-rect" bindtap="tapInteract" data-event="collect">
         <image
            class="{{collect.active ? 'active' : ''}}"
            mode="scaleToFill"
            src="{{collect.isCollection ? '../../../images/active-collect.png' : '../../../images/collect.png'}}"
         ></image>
         <view class="number">{{collect.collectionCount}}</view>
      </view>
   </view>
</view>

<template name="one">
   <view class="layout-one flex-center">
      <preload class="{{ratio >= 1 ? 'column' : 'row'}}" src="{{show ? url : ''}}" needRatio=true mode="widthFix" data-index="0" bindsetratio="setRatio" bindloaded="handleLoaded" bindtap="tapPreload"></preload>
   </view>
</template>

<template name="two">
   <view class="{{type}}">
      <view class="flex-box skeleton-rect">
         <block qq:for="{{images}}" qq:key="{{index}}">
            <preload class="photo" src="{{item.show ? item.url : ''}}" index="{{index}}" data-index="{{index}}" bindloaded="handleLoaded" bindtap="tapPreload"></preload>
         </block>
      </view>
   </view>
</template>