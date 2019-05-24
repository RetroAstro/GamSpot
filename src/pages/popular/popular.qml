<view class="container">
   <view class="post-box skeleton">
      <skeleton selector="skeleton" showSkeleton="{{showSkeleton}}" setStyle="min-height: 1354rpx;"></skeleton>
      <block qq:for="{{dataList}}" qq:key="{{index}}" qq:for-item="postItems">
         <block qq:for="{{postItems}}" qq:key="id">
            <post item="{{item}}" bindnavigate="onNavigate"></post>
         </block>
      </block>
   </view>
   <view class="loading-box flex-center {{showSkeleton ? 'mask' : ''}}">{{loadedText ? loadedText : loading ? '加载中 ...' : ''}}</view>
</view>
