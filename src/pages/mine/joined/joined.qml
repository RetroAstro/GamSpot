<view class="container">
  <block qq:for="{{circles}}" qq:key="id">
      <navigator hover-class="none" class="circle-box flex-start" open-type="navigateTo" url="/pages/circle/single/single?circleId={{item.id}}">
          <!-- <preload class="avatar skeleton-radius" src="{{item.avatarUrl}}"></preload> -->
          <view class="avatar skeleton-radius">
            <image mode="scaleToFill" src="../../../images/coffee.jpg" class="fadeIn" style="width: 100%; height: 100%;"></image>
          </view>
          <view class="info flex-col-between">
             <view class="name skeleton-rect">{{item.name}}</view>
             <view class="data-box flex-start skeleton-rect">
                <view class="joined">{{item.joinCount}}个人已加入</view>
                <view class="post">{{item.talkingCount}}条邮话</view>
             </view>
          </view>
      </navigator>
  </block>
</view>
