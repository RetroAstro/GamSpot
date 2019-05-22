<view class="container">
   <view class="welcome">欢迎来到重邮圈</view>
   <view class="choose">请先选择您的性别</view>
   <view class="main">
      <view class="avatar-box flex-between">
         <view class="boy flex-col-between {{gender == 1 ? 'active' : ''}}" bindtap="chooseGender" data-gender="1">
            <image mode="scaleToFill" src="../../images/boy.png"></image>
            <view class="title flex-center">男生</view>
         </view>
         <view class="girl flex-col-between {{gender == 2 ? 'active' : ''}}" bindtap="chooseGender" data-gender="2">
            <image mode="scaleToFill" src="../../images/girl.png"></image>
            <view class="title flex-center">女生</view>
         </view>
      </view>
      <view class="confirm flex-center" bindtap="onNavigate">确定</view>
   </view>
</view>