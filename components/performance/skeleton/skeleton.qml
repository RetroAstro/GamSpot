<block qq:if="{{show}}">
   <view class="skeleton-box {{showSkeleton ? '' : 'fadeOut'}}" bindtransitionend="hideSkeleton">
      <block qq:for="{{rectLists}}" qq:key="index">
         <view class="shine" style="width: {{item.width}}px; height: {{item.height}}px; position: absolute; left: {{item.left}}px; top: {{item.top}}px;"></view>
      </block>
      <block qq:for="{{circleLists}}" qq:key="index">
         <view class="shine" style="width: {{item.width}}px; height: {{item.height}}px; position: absolute; left: {{item.left}}px; top: {{item.top}}px; border-radius: 50%;"></view>
      </block>
   </view>
</block>