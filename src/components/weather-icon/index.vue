<template>
  <view class="weather-icon">
    <view :class="[ type , 'icon']"></view>
  </view>
</template>
<style lang="less">
@import "./index.less";
.weather-icon{
  width: 300px;
  height:300px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<script>
export default {
  name: 'WeatherIcon',
  props:{
    // sunny cloudy rainy rainbow starry stormy snowy
    "type":{
      type:String,
      default: "sunny",
      require: true
    }
  },

}
</script>
