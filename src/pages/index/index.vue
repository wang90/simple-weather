<template>
  <view class="content weather">
    <view class="header">
      <view class="province" @tap = "chooseAddress">{{province}}</view>
    </view>
    <view class="weather-info">
      <view class="weather-compontent">
        <view class="title">{{weather}}</view>
        <view class="address">{{district}}</view>
      </view>
      <weather-icon :type='type'></weather-icon>
      <view class="weather-temp">{{temp}}</view>
    </view>
    <view class="data-source">{{source}}</view>
  </view>
</template>
<style lang="less">
@import "./index.less";
</style>
<script>
import WeatherIcon from "@/components/weather-icon/index";
import { getWeather , getLocation , getLocationName , chooseLocation } from "@/api/index.ts";
import SKY  from "@/config/skyicon.ts";
import Config from '@/config/index.ts';

const shareTitle = Config.shareTitle;

export default {

  name: 'Home',
  components: {
    WeatherIcon,
  },

  data () {
    return {
      temp: '~',
      source: '数据来源: 彩云天气',
      district: '获取定位中...',
      weather: '获取数据',
      type: '',
      province: '',
    }
  },

  created() {
    console.log("created");
    getLocation().then( res => {
      this.getWeather( res.lonlant );
    })

  },
  methods: {

    getWeather( lonlat ) {

      getWeather(lonlat).then( res => {
        if (res.status === 'ok') {
          const result = res.result || {};
          const hourlys = result.hourly || {};
          const skycons = hourlys.skycon || [];
          const temps = hourlys.temperature || []
          const today = skycons[0] || {};
          if ( today) {
            const sky = SKY[today.value]
            this.type = sky.type;
            this.weather = sky.value;
            this.temp  = Math.floor(temps[0].value);
          }
        }
      }).catch( err => {
        console.log(err);
      })

      getLocationName( lonlat ).then( res => {
        if ( res.status === "1" ) {
          const regeocode = res.regeocode || {};

          if ( regeocode ) {
            const addressComponent = regeocode.addressComponent || {};
            const province = addressComponent.province;
            const district = addressComponent.district;
            this.district = district;
            this.province = province
          }else {
            this.district = '未知地域';
            this.province = '';
          }
        }
      }).catch( () => {
          this.district = '未知区域';
          this.province = ''
      })
    },

    chooseAddress() {
      // 切换地址
      console.log("切换地址");

      chooseLocation().then( res => {
        if ( res && res.longitude && res.latitude ) {
          this.getWeather(`${res.longitude},${res.latitude}`);
        }
      }).catch( err => {
        console.log(err);
      })
    }
  },

  onShareAppMessage() {
    return {
      title: shareTitle,
      path:'/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: shareTitle,
      path:'/pages/index/index?add=share'
    }
  },

  onAddToFavorites() {
    return {
      title: shareTitle,
      query: '',
    }
  }
}
</script>
