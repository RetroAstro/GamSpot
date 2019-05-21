> ## 重邮圈

**基础功能**

- [x] 绑定登录
- [x] 选择性别
- [x] 加入圈子
- [x] 发布邮话
- [x] 回复评论
- [x] 点赞与收藏

**性能优化**

- [x] 骨架屏
- [x] 循环渲染中指定 key 值
- [x] 图片预加载 ( 提前获取图片尺寸，渐变显示图片 )
- [x] 图片懒加载 ( Intersection Observer )
- [x] 邮话局部加载 ( 将数据分批传入视图层，避免一次性 setData 数据过大 )

**其他**

- [x] 图片预览
- [x] 图片上传
- [x] 全局状态管理 ( redux )

**待办清单**

- [x] 热门页
- [ ] 通知页
- [ ] 个人页
- [ ] 抽离页面公共逻辑，复用代码
- [ ] 用户体验优化
- [ ] 渐变更新视图数据
- [ ] 评论时可添加图片、选择 emoji
- [ ] 删除评论
- [ ] 图片上传时可取消已选择的图片
- [ ] 分包加载
- [ ] 跨页面通信 ( event bus )

**Bug 修复** 

- [x] 重构登录逻辑
- [x] 安卓端：无法回复评论
- [x] 显示正常的输出内容
- [ ] 控制并修正输入内容