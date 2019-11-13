<view class="container">
   <!-- <view class="checked-box flex-end">
      <view class="checked">一键已读</view>
   </view> -->
   <view class="notice-box">
     <block qq:for="{{dataList}}" qq:key="{{index}}" qq:for-item="noticeItems">
        <block qq:for="{{noticeItems}}" qq:key="noticeId">
           <view class="notice flex-start">
              <block qq:if="{{item.type == 'comment' || item.type == 'reply'}}">
                <image mode="scaleToFill" src="../../images/notice-comment.png"></image>
              </block>
              <block qq:elif="{{item.type == 'agree'}}">
                <image mode="scaleToFill" src="../../images/notice-like.png"></image>
              </block>
              <block qq:else>
                <image mode="scaleToFill" src="../../images/notice-bell.png"></image>
              </block>
              <view class="info flex-col-between">
                 <view class="message">
                    <view class="user">{{item.name}}</view>
                    {{messages[item.type]}}
                 </view>
                 <view class="time">{{item.createdTime}}</view>
              </view>
           </view>
        </block>
     </block>
     <view class="loading-box flex-center">{{loadedText ? loadedText : loading ? '加载中 ...' : ''}}</view>
   </view>
</view>
