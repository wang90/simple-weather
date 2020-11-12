<template>
  <view class="content weather">
    <view class="header">
      <view class="province" @tap="showAddressComponent" v-if="city">
        <text class="_icon postion-icon"></text>{{ city }}</view>
    </view>
    <view class="weather-info">
       <weather-icon :type='type'></weather-icon>
    </view>
    <view class="weather-icon-component" v-if="city">
      <view class="weather-temp">{{temp}}</view>
      <view class="title">{{weather}}</view>
      <view class="weather-compontent">
        <view class="address">{{district}}</view>
      </view>
    </view>
    <view class="data-source">{{source}}</view>
    <address-component :visible.sync= "chooseAddressVisible" @choose= "chooseAddress"></address-component>
  </view>
</template>
<style lang="less">
@import "./index.less";
</style>
<script>
import WeatherIcon from "@/components/weather-icon/index";
import AddressComponent from "@/components/address-component/index";
import { getWeather , getLocation , getLocationName } from "@/api/index.ts";
import SKY  from "@/config/skyicon.ts";
import Config from '@/config/index.ts';
const shareTitle = Config.shareTitle;

export default {

  name: 'Home',
  components: {
    WeatherIcon,
    AddressComponent,
  },

  data () {
    return {
      temp: '',
      source: '数据来源: 彩云天气',
      district: '获取定位中...',
      weather: '获取数据',
      type: '',
      province: '',
      city: '',
      chooseAddressVisible: false,
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
      getWeather( lonlat ).then( res => {
        if ( res.status === 'ok' ) {
          const result = res.result || {};
          const hourlys = result.hourly || {};
          const skycons = hourlys.skycon || [];
          const temps = hourlys.temperature || []
          const today = skycons[ 0 ] || {};
          if ( today ) {
            const sky = SKY[ today.value ]
            this.type = sky.type;
            this.weather = sky.value;
            this.temp  = Math.floor( temps[0].value );
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
            const city = addressComponent.city;
            if ( typeof city === 'string' ) {
              this.city = city;
            } else if ( typeof city === 'object' && city instanceof Array && city.length > 0 ) {
              this.city = city[0];
            } else {
              this.city = province || district;
            }
            this.district = district;
            this.province = province;
          } else {
            this.district = '未知地域';
            this.city = "未知地域"
            this.province = '未知地域';
          }
        }
      }).catch((err) => {
          console.log(err);
          this.district = '未知区域';
          this.province = ''
      })
    },

    chooseAddress( lonlat ) {
      this.getWeather(`${ lonlat }` );
    },

    showAddressComponent() {
      this.chooseAddressVisible = !this.chooseAddressVisible;
    },
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
