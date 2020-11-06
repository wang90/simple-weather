<template>
  <view :class="['address-compontent',{ 'show': visible }]">
    <view class="default-title">热门城市</view>
    <view class="default-address">
      <view v-for = "(ad, index) in address"
            :class="['default-address-item', {'active':ad.active}]"
            :key="index"
            @tap = "choose(index)">{{ ad.city }}</view>
    </view>
  </view>
</template>
<style lang="less">
.address-compontent {
  position: fixed;
  left: 0 ;
  right:0;
  padding: 50px 20px;
  background: #fff;
  height: 300px;
  bottom: -9999px;
  box-shadow: 0 0 6px 0 rgba(0,0,0,.1);
  transition:  bottom 0.4s;
  &.show {
    bottom: 0 ;
  }
  .default-title {
     font-size: 30px;
     color: #333;
     margin-bottom: 20px;
  }
  .default-address {
    display : flex;
    .default-address-item {
      border: 2px solid #333;
      border-radius: 10px;
      padding: 5px 15px;
      margin : 0 10px;
      transition: all 0.1s;
      color: #333;
      &.active {
        background: #333;
        color: #fff;
        border-color: #333
      }
    }
  }

}
</style>
<script>
import { getLocation , getLocationName , chooseLocation } from "@/api/index.ts";
const defaultAddress = [
  { 'city': '北京', 'type': 'city', 'lonlat': '116.397827,39.90374' },
  { 'city': '上海', 'type': 'city', 'lonlat': '121.499763,31.23958' },
  { 'city': '广州', 'type': 'city', 'lonlat': '113.32446,23.10647' },
  { 'city': '更多', 'type': 'other', 'lonlat': '' },
]
export default {
  name: 'AddressComponent',
  props: {
    visible: {
      type : Boolean,
      default: false,
    }
  },
  data() {
    return {
      address: [],
    }
  },
  created() {
    this.address = defaultAddress.map(( v, i ) => {
       const item = {
          city : v.city,
          lonlat: v.lonlat,
          active: false,
          type: v.type,
       }
       return item;
    })
  },
  methods: {
    choose( index ) {
      const address = this.address[ index ];
      console.log(address)
      const type = address.type;
      this.address.map( v => v.active = false );
      if ( type === 'other') {
        chooseLocation().then( res => {
          if ( res && res.longitude && res.latitude ) {
            this.emit( `${ res.longitude },${ res.latitude }`)
          }
        }).catch( err => {
          console.log(err);
        })
      } else {
        this.address[ index ][ 'active' ] = true;
        this.emit( address.lonlat );
      }
    },
    emit( lonlat ) {
      this.$emit( "choose", `${ lonlat }` )
      this.$emit( "update:visible", false );
    }
  }
}
</script>
