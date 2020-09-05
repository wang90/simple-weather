<template>
  <view class="content">
    <view class="weather-compontent">
      <view class="title">晴天</view>
      <view class="address">海淀区</view>
    </view>
    <weather></weather>
  </view>
</template>
<style lang="less">
@import "./index.less";
.weather-compontent{
  text-align:center;
  color:#e0e0e0;
  .title{
    font-size:50px;
  }
  .address{
    font-size:30px;
  }
  // .title,
  // .address{

  // }
}
</style>
<script>
import { ref } from 'vue'
import weather from "@/components/weather/index"

export default {
  components: {
    weather
  },
  setup () {
    const msg = ref('Hello world')
    return {
      msg
    }
  }
}
</script>
