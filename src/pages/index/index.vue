<template>
  <view class="content weather">
    <view class="header">
      <view class="province" @tap="chooseAddressVisible = !chooseAddressVisible" v-if="city">
        <text class="_icon postion-icon"></text>{{ city }}</view>
    </view>
    <view class="weather-info">
       <weather-icon :type='type'></weather-icon>
    </view>
    <weather-info :city="city" :temp="temp" :weather="weather" :district="district"></weather-info>
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
import WeatherInfo from "@/components/weather-info/index";
import { getWeatherInfo } from "@/api/data";
import SKY  from "@/config/skyicon";
import Config from '@/config/index';

const shareTitle = Config.shareTitle;

export default {

  name: 'Home',
  components: {
    WeatherIcon,
    AddressComponent,
    WeatherInfo,
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
    /* 数据 */
    getWeather( lonlat ) {
      getWeatherInfo( lonlat ).then( response => {
        for ( const  i in response ) {
          const res = response[i];

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

          } else if ( res.status === 1 || res.status === '1' ) {

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
        }
      }).catch( err => {
        console.log(err);
      })
    },


    /* 操作 */

    chooseAddress( lonlat ) {
      this.getWeather(`${ lonlat }` );
    },

    showAddressComponent() {
      this.chooseAddressVisible = !this.chooseAddressVisible;
    },
  },


  /* 分享 */
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
