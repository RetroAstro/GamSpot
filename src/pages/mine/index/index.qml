<view class="container">
   <view class="user-box">
      <view>
         <view class="flex-center">
            <image class="avatar" mode="scaleToFill" src="{{gender === 'male' ? '../../../images/boy.png' : '../../../images/girl.png'}}"></image>
         </view>
         <view class="flex-center">
            <view class="editable flex-start">
               <input class="name" maxlength="10" value="{{nickname}}" placeholder="(⊙ˍ⊙)" placeholder-style="placeholder" bindconfirm="editNickname"/>
               <image class="pencil" mode="scaleToFill" src="../../../images/pencil.png"></image>
            </view>
         </view>
      </view>
   </view>
   <view class="personal-box">
      <navigator class="joined flex-between" open-type="navigateTo" url="/pages/mine/joined/joined">
         <view class="left">
            <view class="flex-start">
               <image class="icon" mode="scaleToFill" src="../../../images/mine-joined.png"></image>
               <view class="name">我加入的圈子</view>
            </view>
         </view>
         <view class="right">
            <image mode="scaleToFill" src="../../../images/mine-go.png"></image>
         </view>
      </navigator>
      <navigator class="post flex-between" open-type="navigateTo" url="/pages/mine/published/published">
         <view class="left">
            <view class="flex-start">
               <image class="icon" mode="scaleToFill" src="../../../images/mine-post.png"></image>
               <view class="name">我发布的邮话</view>
            </view>
         </view>
         <view class="right">
            <image mode="scaleToFill" src="../../../images/mine-go.png"></image>
         </view>
      </navigator>
      <navigator class="collect flex-between" open-type="navigateTo" url="/pages/mine/collects/collects">
         <view class="left">
            <view class="flex-start">
               <image class="icon" mode="scaleToFill" src="../../../images/mine-collect.png"></image>
               <view class="name">我的收藏</view>
            </view>
         </view>
         <view class="right">
            <image mode="scaleToFill" src="../../../images/mine-go.png"></image>
         </view>
      </navigator>
      <navigator class="like flex-between" open-type="navigateTo" url="/pages/mine/likes/likes">
         <view class="left">
            <view class="flex-start">
               <image class="icon" mode="scaleToFill" src="../../../images/mine-like.png"></image>
               <view class="name">我的点赞</view>
            </view>
         </view>
         <view class="right">
            <image mode="scaleToFill" src="../../../images/mine-go.png"></image>
         </view>
      </navigator>
   </view>
</view>
