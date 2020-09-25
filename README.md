# simple 天气
👽 &nbsp;&nbsp;&nbsp;&nbsp;一款简单的天气小程序软件  
👽 &nbsp;&nbsp;&nbsp;&nbsp;一款多端小程序应用  
👽 &nbsp;&nbsp;&nbsp;&nbsp;一款个人开发产品  

### 应用
#### taro
https://taro-docs.jd.com/taro/docs/GETTING-STARTED
### vue 2.0 + ts

### 数据来源
#### [彩云天气免费API](https://dashboard.caiyunapp.com)
api : https://api.caiyunapp.com/v2.5/{Token}/{经度, 纬度}/realtime.json

### 使用
``````
# yarn
$ yarn dev:weapp
$ yarn build:weapp
# npm script
$ npm run dev:weapp
$ npm run build:weapp
# 仅限全局安装
$ taro build --type weapp --watch
$ taro build --type weapp
# npx 用户也可以使用
$ npx taro build --type weapp --watch
$ npx taro build --type weapp
``````

### 小程序
![code](./logo/wx-app-code.jpg)

### 更新日志
-  v0.2.1 2020-09-25
   - 修复经纬度默认bug
   - 添加选择地址查天气功能
-  v0.2.0 2020-09-15
   - 修改css全屏幕上下滚动
   - 主机深色模式、浅色模式跟随
- v0.1.1 2020-09-12
  - 分享功能开放: 分享朋友、分享朋友圈、收藏
- v0.1.0 2020-09-07
  - 查询打开时经纬度
  - 查询经度下的天气
  - 天气 icon 动画


