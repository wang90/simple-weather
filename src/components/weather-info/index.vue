<template>
  <view class="weather-icon-component" v-if="city">
    <view class="weather-temp">{{temp}}</view>
    <view class="title">{{weather}}</view>
    <view class="weather-compontent">
      <view class="address">{{district}}</view>
    </view>
  </view>
</template>

<script>

export default {
    name: 'WeatherInfo',
    props: {
      'city': {
        'type': String,
        'default': '',
      },
      'temp': {
        'type': Number | String,
        'default': '',
      },
      'weather': {
        'type': String,
        'default': '',
      },
      'district': {
        'type': String,
        'default': '',
      }
    },
}

</script>
